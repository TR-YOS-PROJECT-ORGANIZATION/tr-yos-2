import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Navbar,
  Offcanvas,
  Nav,
  Col,
  Button,
  Row,
  Modal,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import LogIn from "../Login/LogIn";
import Register from "../Login/Register";
import "./HomePage.css";
import { useAuthContext } from "../../context/AuthContext"; // AuthContext'u kullanmak için import edin.
import MyAccount from "../Dropdown/MyAccount";
import LanguageSelector from "../Languages/LanguageSelector";

const SideBarScrollNavbar = () => {
  const { t } = useTranslation();

  const { currentUser,toggleForm,handleCloseModal,showModal,currentForm } = useAuthContext();
  

  const location = useLocation();
  const [scrollBackground, setScrollBackground] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // const [currentForm, setCurrentForm] = useState("login");
  // const [showModal, setShowModal] = useState(false);
  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setScrollBackground(true);
      } else {
        setScrollBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <Offcanvas
        show={sidebarOpen}
        onHide={toggleSidebar}
        placement="start"
        className="text-dark"
      >
        <Offcanvas.Header closeButton className=""></Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="homeNavbar d-flex flex-column align-items-start fw-bold fs-6">
            <Row fluid id="navbarCollapse">
              <Col fluid>
                <Link
                  to="/"
                  className={`nav-link ${
                    location.pathname === "/" ? "text-danger" : ""
                  }`}
                  href="/"
                  aria-current="page"
                >
                  {t("homepage.home")}
                </Link>
                <Link
                  to="/universites"
                  className={`nav-link ${
                    location.pathname === "/universites" ? "text-danger" : ""
                  }`}
                  href="/universites"
                  aria-current="page"
                >
                  {t("homepage.universities")}
                </Link>

                <Link
                  to="/departmants"
                  className={`nav-link ${
                    location.pathname === "/departmants" ? "text-danger" : ""
                  }`}
                  href="/departmants"
                  aria-current="page"
                >
                  {t("homepage.departments")}
                </Link>

                {currentUser ? (
                  <>
                    <MyAccount />
                  </>
                ) : (
                  <Row fluid id="navbarCollapse">
                    <Col fluid>
                      <IconContext.Provider
                        value={{ size: "1.5em", color: "white" }}
                      >
                        <div className="navbarCollapse">
                          <Button
                            className="signIn btn btn-outline-light my-1 m-3 flex-wrap"
                            type="submit"
                            variant="info"
                            onClick={() => toggleForm("login")}
                          >
                            <i className="fas fa-sign-in-alt me-2"></i>

                            {t("homepage.singIn")}
                          </Button>{" "}
                        </div>
                      </IconContext.Provider>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <Navbar
        bg={scrollBackground ? "light" : "dark"}
        variant={scrollBackground ? "light" : "dark"}
        expand="lg"
        fixed="top"
        className="homeNavbar text-dark fs-5"
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleSidebar}>
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-none d-lg-flex w-100 d-flex w-100 flex-wrap align-items-center justify-content-around style={{opacity: 0.5}} nav-bg ">
            <Row fluid id="navbarCollapse">
              <Col fluid>
                <div className="navbarCollapse d-none d-lg-flex w-100 d-flex w-100 flex-wrap align-items-center justify-content-around">
                  <Link
                    to="/"
                    className={`nav-link ${
                      location.pathname === "/" ? "text-danger" : ""
                    }`}
                    href="/"
                    aria-current="page"
                  >
                    {t("homepage.home")}
                  </Link>
                  <Link
                    to="/universites"
                    className={`nav-link ${
                      location.pathname === "/universites" ? "text-danger" : ""
                    }`}
                    href="/universites"
                    aria-current="page"
                  >
                    {t("homepage.universities")}
                  </Link>

                  <Link
                    to="/departmants"
                    className={`nav-link ${
                      location.pathname === "/departmants" ? "text-danger" : ""
                    }`}
                    href="/departmants"
                    aria-current="page"
                  >
                    {t("homepage.departments")}
                  </Link>
                </div>
              </Col>
            </Row>

            <Row fluid id="navbarCollapse">
              <Col fluid>
                <div className="navbarCollapse">
                  {!currentUser ? (
                    <>
                      <Button
                        className="signIn btn btn-outline-light my-4 py-2 px-4 m-1 flex-wrap"
                        type="submit"
                        variant="info"
                        onClick={() => toggleForm("login")}
                      >
                        <i className="fas fa-sign-in-alt me-2"></i>

                        {t("homepage.signIn")}
                      </Button>
                      <Button
                        className="signUp btn btn-outline-light my-4 py-2 px-4 m-1 flex-wrap"
                        type="submit"
                        variant="primary"
                        onClick={() => toggleForm("register")}
                      >
                        <i className="fas fa-user-alt me-2"></i>

                        {t("homepage.signUp")}
                      </Button>
                    </>
                  ) : (
                    <MyAccount />
                  )}
                </div>
              </Col>
            </Row>

            <Row fluid id="navbarCollapse">
              <Col fluid>
                <div className="languageDropdown">
                  <LanguageSelector />
                </div>
              </Col>
            </Row>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton style={{ border: "none" }}></Modal.Header>
        <Modal.Body>
          {currentForm === "login" ? (
            <LogIn />
          ) : (
            <Register
         
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SideBarScrollNavbar;
