import { useContext, useState } from "react";
import { useYosContext } from "../../context/Context";
import { useTranslation } from "react-i18next";
import "../Style/Departmants.css";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";

const DepartmentsCard = ({ item }) => {
  const { universities, departments, card, setCompareId, setFavoriId } =
    useYosContext();
  const { t } = useTranslation();

  const [showSignInCompareModal, setShowSignInCompareModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFavoriToast, setShowFavoriToast] = useState(false);
  const [showSignInHeartModal, setShowSignInHeartModal] = useState(false);
  const [showDeleteToast, setShowDeleteToast] = useState(false);

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

  const universityImagesMap = universities.reduce((map, university) => {
    if (university && university.images && university.images.length > 0) {
      map[university?.en] = university.images.slice(0, 12);
    }
    return map;
  }, {});

  const { city, university, department, faculty } = item;
  const departmentImages = universityImagesMap[university?.en] || [];

  return (
    <Container className="p-1 rounded-2  ">
      <Card key={university.id} style={{ width: "100%", height: "25rem" }}>
        <div className="img" style={{ width: "100%", height: "60%" }}>
          <Carousel
            showStatus={false}
            showIndicators={false}
            dynamicHeight={true}
            infiniteLoop={true}
            className="slide-image"
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
            background: isBoolen ? "#E6EBF1" : "#26e3a7",
          }}
          type="button"
          onClick={toggleShowSignInCompareModal}
        >
          <i
            className="fa-solid p-1 fa-rotate-right fa-md"
          
          ></i>
          <span className="mx-1"></span>
          Compare
        </Button>
        <Card.Body
          className="cardBody d-flex w-100 justify-content-between"
          style={{ height: "33%" }}
        >
          <div className="left ">
            <Card.Title className="text-start  fs-6">
              <Link
                to={`/universities/${item.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="dep text-decoration-none text-bold"
              >
                {item.department.en}
              </Link>
            </Card.Title>
            <Card.Title className="facul text-start  fs-6">
            <Link
                key={item.id}
                to={`/universities/${item.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="dep text-decoration-none"
              >
                {item.faculty.en}
              </Link>
            </Card.Title>
            <Card.Text className="uni text-start text-muted">
              {item.university?.en}
            </Card.Text>
          </div>{" "}
          <span className="mx-2"></span>
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
               style={{ color: isBoolenFavori ? "  #017EFA" : "  #00724e",}}
              ></i>
            </Button>
        </Card.Body>
        <ListGroup className="list-group-flush w-100">
          <ListGroup.Item>
            <div className="cardFot  d-flex  justify-content-between p-1">
              <div className="left d-flex flex-nowrap">
                <i className="bi bi-geo-alt-fill"></i>
                <span className="mx-1"></span>
                {item.city?.en}
              </div>
              <div className="right d-flex flex-nowrap">
                <i className="bi bi-cash"></i>
                <span className="mx-1"></span>
              </div>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
};

export default DepartmentsCard;
