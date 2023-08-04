import React, { useEffect } from "react";
import { Button, Container, Modal } from "react-bootstrap";
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

const HomeCard = ({ item, universityImage }) => {
  // State değerleri ve toggle fonksiyonları tanımlanıyor
  const [showSignInCompareModal, setShowSignInCompareModal] = useState(false);

  const [showSignInHeartModal, setShowSignInHeartModal] = useState(false);

  const {
    compareId,
    setCompareId,
    user,
    favoriId,
    setFavoriId,
    favori,
    setFavori,
  } = useYosContext();

  const {currentUser,setShowModal,showModal}=useAuthContext()
  const [isBoolen, setIsBoolen] = useState(true)

 ///<-----------------------------------COMPARE START---------------------------------------------->
  const toggleShowSignInCompareModal = async (e) =>{
    e.preventDefault()
  
  if (currentUser) {

    console.log("Kullanıcı giriş yaptı. Karşılaştırma sayfasına yönlendiriliyor...");
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
              user_id:currentUser,
              token:
                "SX2qL5O3ivipPSMIWN8nXnaLWOiy4cEq7UdgZk448T5ZDpT1qbgMIrXVNquP1CWyNAH3JvoEVqnjiyg20a17549275a86d0e835660e56847e87a",
            },
          }
        );
        const newCompareId = JSON.parse(sessionStorage.getItem("compareId")) || [];
    
        if (!newCompareId.includes(responseCompare.data)) {
          newCompareId.push(responseCompare.data);
          sessionStorage.setItem("compareId", JSON.stringify(newCompareId));
          
          setCompareId(newCompareId);
          setIsBoolen(!isBoolen);
        }
 
      } else if (!isBoolen) {
        const responseCompareDelete = await axios.get(
          `https://tr-yös.com/api/v1/users/deletecompare.php`,
          {
            params: {
              id: item.id,
              // user_id: user?.userID,
              user_id:currentUser,
              token:
                "SX2qL5O3ivipPSMIWN8nXnaLWOiy4cEq7UdgZk448T5ZDpT1qbgMIrXVNquP1CWyNAH3JvoEVqnjiyg20a17549275a86d0e835660e56847e87a",
            },
          }
        );
        console.log("deletye", responseCompareDelete);
        if (compareId.includes(item.id)) {
          setCompareId((prevIds) =>
            prevIds.filter((id) => id !== responseCompareDelete.data)
          );
          
        }
        sessionStorage.setItem('compareId', JSON.stringify(compareId.filter((id) => id !== responseCompareDelete.data)));
      }
    } catch (error) {
      console.log(error);
    }
    // setCompareId(responseCompare.data);
    console.log("mnd", item.id);

  }
 ///<-----------------------------------COMPARE END---------------------------------------------->
 ///<-----------------------------------FAVORİ START---------------------------------------------->
const toggleShowSignInHeartModal = async (e) => {
  //https://tr-yös.com/api/v1/users/addfavorite.php
  e.preventDefault()
  if (currentUser) {

    console.log("Kullanıcı giriş yaptı. Karşılaştırma sayfasına yönlendiriliyor...");
  } else {
    // Kullanıcı giriş yapmamışsa, oturum açma formunu aç
    setShowModal(!showModal);
  }

  try {
    if (isBoolen) {
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
      const newFavoriId = JSON.parse(sessionStorage.getItem("favoriID")) || [];
    
      if (!newFavoriId.includes(responseFavori.data)) {
        newFavoriId.push(responseFavori.data);
        sessionStorage.setItem("favoriID", JSON.stringify(newFavoriId));
        
        setCompareId(newFavoriId);
        setIsBoolen(!isBoolen);
      }
      // if (!favoriId.includes(responseFavori.data)) {
      //   setFavoriId((prevIds) => [...prevIds, responseFavori.data]);
      //   sessionStorage.setItem('favoriId', JSON.stringify([...favoriId, responseFavori.data]));
      //   setIsBoolen(!isBoolen);
      // }
    } else if (!isBoolen) {
      const responseFavoriDelete = await axios.get(
        `https://tr-yös.com/api/v1/users/deletefavorite.php`,
        {
          params: {
            id: item.id,
            // user_id: user?.userID,
            user_id: currentUser,
            token:
              "SX2qL5O3ivipPSMIWN8nXnaLWOiy4cEq7UdgZk448T5ZDpT1qbgMIrXVNquP1CWyNAH3JvoEVqnjiyg20a17549275a86d0e835660e56847e87a",
          },
        }
      );
      console.log("Favorideletye", responseFavoriDelete.data);
      if (favoriId.includes(item.id)) {
        setFavoriId((prevIds) =>
          prevIds.filter((id) => id !== responseFavoriDelete.data)

        );

      }

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
        {departmentImages.length > 0 ? (
          <div style={{ width: "100%", height: "60%" }}>
            <HomeCardSlider images={departmentImages} />
          </div>
        ) : (
          <Card.Img
            variant="top"
            style={{ width: "100%", borderRadius: "5px" }}
            src={uniDefault}
            className="relative defaultimg "
          />
        )}
        <Button
          variant="light"
          size="lg"
          className="comp h-20 p-1 px-2 rounded-1 border-0 d-flex flex-nowrap"
          style={{
            position: "absolute",
            top: "195px",
            right: "10px",
            color: "#0B3660",
          }}
          type="button"
          onClick={toggleShowSignInCompareModal}
        >
          <i
            className="fa-solid p-1 fa-rotate-right fa-md"
            style={{ color: "#017EFA" }}
          ></i>
          <span className="mx-1"></span>
          Compare
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
                target="_blank"
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
              style={{ position: "absolute", top: "190px", right: "10px" }}
              className="btn btn-outline-light  my-5 py-1 px-1 m-1 rounded-circle border-1  d-flex flex-nowrap"
              type="button"
              onClick={toggleShowSignInHeartModal}
            >
              <i class="heart fa-solid fa-heart-circle-check"></i>
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
    </Container>
  );
};
export default HomeCard;
