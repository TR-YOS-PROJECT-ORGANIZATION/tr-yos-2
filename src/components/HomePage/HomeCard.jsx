import React, { useEffect } from "react";
import { Button, Carousel, Container, Modal } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import uniDefault from "../../assets/uni.jpg";
import HomeCardSlider from "./HomeCardSlider";
import "../Style/HomeCard.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import LogIn from "../Login/LogIn";
import { useYosContext } from "../../context/Context";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
import ToastComponent from "../toastComponent/ToastComponent";
import { useTranslation } from 'react-i18next';
const HomeCard = ({ item, universityImage }) => {
  const { t } = useTranslation();
  // State değerleri ve toggle fonksiyonları tanımlanıyor
  const [showSignInCompareModal, setShowSignInCompareModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFavoriToast, setShowFavoriToast] = useState(false);
  const [showSignInHeartModal, setShowSignInHeartModal] = useState(false);
  const [showDeleteToast, setShowDeleteToast] = useState(false)
  const {
    setCompareId,
    setFavoriId,
  } = useYosContext();
  const { currentUser, setShowModal, showModal } = useAuthContext();
  const [isBoolen, setIsBoolen] = useState(true);
  const [isBoolenFavori, setIsBoolenFavori] = useState(true);
  
  ///<-----------------------------------COMPARE START---------------------------------------------->
  const toggleShowSignInCompareModal = async (e) => {
    e.preventDefault();
    const newCompareId = JSON.parse(sessionStorage.getItem("compareId")) || [];
    if (currentUser) {
      console.log(
        "Kullanıcı giriş yaptı. Karşılaştırma sayfasına yönlendiriliyor..."
      );
    } else {
      // Kullanıcı giriş yapmamışsa, oturum açma formunu aç
      setShowModal(!showModal);
    }
    try {
      if (isBoolen) {
        const responseCompare = await axios.get(
          `https://tr-yös.com/api/v1/users/addcompare.php`,
          {
            params: {
              id: item.id,
              user_id: currentUser,
              token:
                "SX2qL5O3ivipPSMIWN8nXnaLWOiy4cEq7UdgZk448T5ZDpT1qbgMIrXVNquP1CWyNAH3JvoEVqnjiyg20a17549275a86d0e835660e56847e87a",
            },
          }
        );
          newCompareId.push(responseCompare.data);
          sessionStorage.setItem("compareId", JSON.stringify(newCompareId));
          setCompareId(newCompareId);
          setIsBoolen(!isBoolen);
          setShowSuccessToast(true);
        //   if (!newCompareId.includes(responseCompare.data)) {
        // }
      } else if (!isBoolen) {
        const responseCompareDelete = await axios.get(
          `https://tr-yös.com/api/v1/users/deletecompare.php`,
          {
            params: {
              id: item.id,
              user_id: currentUser,
              token:
                "SX2qL5O3ivipPSMIWN8nXnaLWOiy4cEq7UdgZk448T5ZDpT1qbgMIrXVNquP1CWyNAH3JvoEVqnjiyg20a17549275a86d0e835660e56847e87a",
            },
          }
        );
        console.log("id:", item.id);
        const updatedCompare = newCompareId.filter(
          (compareItem) => compareItem.id != item.id
        );
        console.log("update:", updatedCompare);
        sessionStorage.setItem("compareId", JSON.stringify(updatedCompare));
        setCompareId(updatedCompare);
        setShowDeleteToast(true);
        setIsBoolen(!isBoolen);
        console.log("delete", responseCompareDelete.data);
      }
    } catch (error) {
      console.log(error);
    }
    console.log("mnd", item.id);
  };
  ///<-----------------------------------COMPARE END---------------------------------------------->
  ///<-----------------------------------FAVORİ START---------------------------------------------->
  const toggleShowSignInHeartModal = async (e) => {
    //https://tr-yös.com/api/v1/users/addfavorite.php
    e.preventDefault();
    const newFavoriId = JSON.parse(sessionStorage.getItem("favoriID")) || [];
    if (currentUser) {
      console.log(
        "Kullanıcı giriş yaptı. Karşılaştırma sayfasına yönlendiriliyor..."
      );
    } else {
      // Kullanıcı giriş yapmamışsa, oturum açma formunu aç
      setShowModal(!showModal);
    }
    try {
      if (isBoolenFavori) {
        const responseFavori = await axios.get(
          `https://tr-yös.com/api/v1/users/addfavorite.php`,
          {
            params: {
              id: item.id,
              user_id: currentUser,
              token:
                "SX2qL5O3ivipPSMIWN8nXnaLWOiy4cEq7UdgZk448T5ZDpT1qbgMIrXVNquP1CWyNAH3JvoEVqnjiyg20a17549275a86d0e835660e56847e87a",
            },
          }
        );
        if (!newFavoriId.includes(responseFavori.data)) {
          newFavoriId.push(responseFavori.data);
          sessionStorage.setItem("favoriID", JSON.stringify(newFavoriId));
          setShowFavoriToast(true);
          setFavoriId(newFavoriId);
          console.log("success");
          setIsBoolenFavori(!isBoolenFavori);
        }
        // if (!favoriId.includes(responseFavori.data)) {
        //   setFavoriId((prevIds) => [...prevIds, responseFavori.data]);
        //   sessionStorage.setItem('favoriId', JSON.stringify([...favoriId, responseFavori.data]));
        //   setIsBoolen(!isBoolen);
        // }
      } else if (!isBoolenFavori) {
        const responseFavoriDelete = await axios.get(
          `https://tr-yös.com/api/v1/users/deletefavorite.php`,
          {
            params: {
              id: item.id,
              user_id: currentUser,
              token:
                "SX2qL5O3ivipPSMIWN8nXnaLWOiy4cEq7UdgZk448T5ZDpT1qbgMIrXVNquP1CWyNAH3JvoEVqnjiyg20a17549275a86d0e835660e56847e87a",
            },
          }
        );
        console.log("Favorideletye", newFavoriId);
        const newFavoriDelete = newFavoriId.filter(
          (favoriItem) => favoriItem.id != item.id
        );
        sessionStorage.setItem("favoriID", JSON.stringify(newFavoriDelete));
        setShowDeleteToast(true);
        setFavoriId(newFavoriDelete);
        console.log("success2", newFavoriDelete);
        setIsBoolenFavori(!isBoolenFavori);
      }
    } catch (error) {
      console.log(error);
    }
    // setCompareId(responseCompare.data);
    console.log("mnd", item.id);
  };
  ///<-----------------------------------FAVORİ END---------------------------------------------->
  const departmentName = item?.university?.tr;
  const departmentImages = universityImage[departmentName] || [];
  return (
    <Container className="p-3  rounded-2 " style={{ position: "relative" }}>
    
      <Card
        className="cardBody rounded-2 "
        style={{ width: "100%", height: "25rem" }}
      >
      <div className="img" style={{ width: "100%", height: "60%" }}>
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
                  src={image}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <Button
          variant="light"
          size="lg"
          className="comp h-20 p-1 px-2 rounded-1 border-0 d-flex flex-nowrap"
          style={{
            position: "absolute",
            top: "195px",
            right: "10px",
            background: isBoolen ? "#E6EBF1" : "#26E3A7",
          }}
          type="button"
          onClick={toggleShowSignInCompareModal}
        >
          <i
            className="fa-solid p-1 fa-rotate-right fa-md"
          ></i>
          <span className="mx-1"></span>
          {t("compare.title")}
        </Button>
        <Card.Body
          className="cardBody d-flex justify-content-between w-100 "
          style={{ height: "33%" }}
        >
          <div className=" left ">
            <Card.Title className=" text-start fs-6">
              <Link
                key={item?.id}
                to={`/universities/${item.id}`}
                rel="noopener noreferrer"
                className="dep text-decoration-none"
              >
                {item?.department?.en}
              </Link>
            </Card.Title>
            <Card.Title className="facul text-start  fs-6">
              <Link
                key={item.id}
                to={`/universities/${item.id}`}
               
                rel="noopener noreferrer"
                className="dep text-decoration-none"
              >
                {item?.faculty?.en}
              </Link>
            </Card.Title>
            <Card.Text className="uni text-start text-muted">
              {item?.university?.en}
            </Card.Text>
          </div>
          <span className="mx-2"></span>
          <div className="right h-25  d-flex align-items-center justify-content-center p-2">
            <Button
              variant="light"
              size="lg"
              style={{
                position: "absolute",
                top: "190px",
                right: "10px",
              }}
              className="btn btn-outline-light  my-5 py-1 px-1 m-1 rounded-circle border-1  d-flex flex-nowrap"
              type="button"
              onClick={toggleShowSignInHeartModal}
            >
              <i class="heart fa-solid fa-heart-circle-check"
               style={{ color: isBoolenFavori ? "  #017EFA" : "  #00724E",}}
              ></i>
            </Button>
          </div>
        </Card.Body>
        <ListGroup className="list-group-flush w-100">
          <ListGroup.Item>
            <div className="cardFot d-flex justify-content-between p-1 ">
              <div className="left d-flex flex-nowrap ">
                <i class="bi bi-geo-alt-fill "></i>
                <span className="mx-1"></span>
                {item?.city?.en}
              </div>
              <div className="right d-flex flex-nowrap">
                <i class="bi bi-cash"></i>
                <span className="mx-1"></span>
                /years
              </div>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
      {/* Modal componentleri tanımlanıyor */}
      <Modal
        show={showSignInCompareModal}
        onHide={toggleShowSignInCompareModal}
        centered
      >
        <LogIn />
      </Modal>
      {/* Modal componentleri tanımlanıyor */}
      <Modal
        show={showSignInHeartModal}
        onHide={toggleShowSignInHeartModal}
        centered
      >
        <LogIn />
      </Modal>
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
          message={t("toasts.compareAdded")}
        />
        <ToastComponent
          show={showFavoriToast}
          onClose={() => setShowFavoriToast(false)}
          type="success"
          message={t("toasts.favoriteAdded")}
        />
         <ToastComponent
          show={showDeleteToast}
          onClose={() => setShowDeleteToast(false)}
          type="success"
          message={t("toasts.deleteSuccess")}
        />
      </div>
    </Container>
  );
};
export default HomeCard;