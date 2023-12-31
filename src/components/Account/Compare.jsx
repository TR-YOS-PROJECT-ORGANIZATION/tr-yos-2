import React, { useEffect, useState } from "react";
import { useYosContext } from "../../context/Context";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useAuthContext } from "../../context/AuthContext";
import ToastComponent from "../toastComponent/ToastComponent";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";

const Compare = () => {
  const { t } = useTranslation();
  const { compareId, setCompareId, card, universities } = useYosContext();
  const [cardCompare, setCardCompare] = useState([]);
  const [deleteProps, setDeleteProps] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [loading, setLoading] = useState(true);
  const universityImagesMap = universities.reduce((map, university) => {
    if (university && university.images && university.images.length > 0) {
      map[university?.en] = university.images.slice(0, 12);
    }
    return map;
  }, {});

  const { currentUser } = useAuthContext();
  const sessionCompare = JSON.parse(sessionStorage.getItem("compareId"));
  const matchedCards = sessionCompare?.map((compareItem) => {
    const matchingCard = card.find(
      (cardItem) => cardItem.id === compareItem.id
    );
    return matchingCard;
  });
  useEffect(() => {
    setCardCompare(matchedCards);
    setTimeout(() => {
      setLoading(false); // After the async operation, set loading to false
    }, 1000)
  }, [card, deleteProps]);

  const deleteCompare = async (prop) => {
    setDeleteProps(!deleteProps);
    try {
      const responseCompareDelete = await axios.get(
        `https://tr-yös.com/api/v1/users/deletecompare.php`,
        {
          params: {
            id: `${prop}`,

            user_id: currentUser,
            token:
              "SX2qL5O3ivipPSMIWN8nXnaLWOiy4cEq7UdgZk448T5ZDpT1qbgMIrXVNquP1CWyNAH3JvoEVqnjiyg20a17549275a86d0e835660e56847e87a",
          },
        }
      );
      // setCompareId((prevCompareId) =>
      //   prevCompareId.filter((id) => id.id !== prop)
      // );
      const updatedFavori = sessionCompare.filter((item) => item.id !== prop);
      setCompareId(updatedFavori);
      sessionStorage.setItem("compareId", JSON.stringify(updatedFavori));
      setShowSuccessToast(true);
      console.log("delete", responseCompareDelete.data);
    } catch (error) {
      console.log("delete Hatasi", error);
    }
  };

  return (
    <div className="">
      <div
        className=" infoDiv p-5 mb-2 bg-primary text-white"
        style={{ width: "100%" }}
      >
          {loading && (
        <div className="loading-indicator">
          <i class="fa-solid fa-arrows-rotate fa-spin fa-2xl"></i>
          <span  className="mx-1"></span>
          <p>Loading...</p>
        </div>
        
      )}
        <h3 className="p-title fw-bold mt-5 mx-5"> {t("compare.compareUniversities")}</h3>
      </div>
      <Container className="mt-5" style={{ position: "relative" }}>
        <Row className="g-3 d-flex flex-wrap">
          {cardCompare?.map((item) => {
            const university = item?.university;
            const departmentImages = universityImagesMap[university?.en] || [];
            return (
              <Col xs={12} s={6} md={6} lg={4} xl={3}>
                <Card
                  className="card "
                  key={item?.id}
                  style={{ width: "100%", height: "30rem" }}
                >
                  <button
                    className="comp h-20 p-1 px-2 rounded-circle border-0 d-flex justify-content-center align-items-center"
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      color: "#0B3660",
                      zIndex: 1000,
                    }}
                    onClick={() => deleteCompare(item.id)}
                  >
                    <strong>X </strong>
                  </button>
                  <div
                    className="img "
                    style={{ width: "100%", height: "45%" }}
                  >
                    <Carousel
                      showStatus={false}
                      showIndicators={false}
                      dynamicHeight={true}
                      infiniteLoop={true}
                      interval={null} 
                    >
                      {departmentImages.map((image, index) => (
                        <Carousel.Item key={index}>
                          <Card.Img
                            className="defaultimg"
                            variant="top"
                            style={{
                              width: "100%",
                              height: "229.609px",
                              position: "relative",
                              borderRadius: "5px",
                            }}
                            src={
                              image ||
                              "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dW5pdmVyc2l0eXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                            }
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>
                  <Card.Body
                    className="card-body d-flex w-100 justify-content-between"
                    style={{ height: "8%" }}
                  >
                    <h5
                      className="card-title mt-3"
                      style={{ color: "#022F5D" }}
                    >
                      {item?.university.tr}
                    </h5>
                  </Card.Body>
                  <Card.Body className="w-100  " style={{ height: "33%" }}>
                    <Card.Title className="list-group list-group-flush text-start  ">
                      <Card.Title
                        className="list-group-item text-start  "
                        style={{ color: "#4F5E64", fontSize: "small" }}
                      >
                        {item?.faculty.tr}
                      </Card.Title>

                      <Card.Title className="list-group-item text-start  ">
                        <Link
                          className="dep text-decoration-none"
                          style={{ fontSize: "small" }}
                          key={item?.id}
                          to={`/universities/${item?.id}`}
                        >
                          {item?.department.tr}
                        </Link>
                      </Card.Title>

                      <Card.Title
                        className="list-group-item text-start  "
                        style={{ color: "#4F5E64", fontSize: "small" }}
                      >
                        {item?.city.tr}
                      </Card.Title>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{ position: "fixed", minHeight: "200px" }}
      >
        {/* Success Toast */}
        <ToastComponent
          show={showSuccessToast}
          onClose={() => setShowSuccessToast(false)}
          type="success"
          message={t("toasts.compareDelete")}
        />
      </div>
    </div>
  );
};

export default Compare;
