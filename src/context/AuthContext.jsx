import React, { useState, createContext, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MY_TOKEN =
  "SX2qL5O3ivipPSMIWN8nXnaLWOiy4cEq7UdgZk448T5ZDpT1qbgMIrXVNquP1CWyNAH3JvoEVqnjiyg20a17549275a86d0e835660e56847e87a";
const REGISTER_API_URL = `https://tr-yös.com/api/v1/users/newuser.php?token=${MY_TOKEN}`;
const LOGIN_API_URL = `https://tr-yös.com/api/v1/users/login.php?token=${MY_TOKEN}`;

const UPDATE_API_URL = `https://tr-yös.com/api/v1/users/updateuser.php`;

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || false
  );

  // Sayfalar arası gezinme için `useNavigate` hook'unu kullanıyoruz
  const navigate = useNavigate();

  const registerPerson = async (signUser) => {
    const createData = new FormData();
    createData.append("name", signUser.name);
    createData.append("email", signUser.email);
    createData.append("password1", signUser.password1);
    createData.append("password2", signUser.password2);

    
    try {
      const { data } = await axios.post(REGISTER_API_URL, createData, {
        headers: {
         // "Content-Type": "application/json",
         "Content-Type": "multipart/form-data",
        },
      });
      console.log(data)
     /*
      console.log(dataMy)
      console.log(data.user)
      console.log(data.user.userId) 
      console.log(dataMy.usr)
      */
      setCurrentUser(data.user.userId);
     sessionStorage.setItem("user", JSON.stringify(data.user.userId));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // //! Kullanıcı girişi yapmak için asenkron bir işlev tanımlıyoruz

  const loginPerson = async (signUser) => {
    const createData = new FormData();
    createData.append("email", signUser.email);
    createData.append("password", signUser.password);
    try {
      const { data } = await axios.post(`${LOGIN_API_URL}`, createData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
         // headers: {
        //   "Content-Type": "application/json",
          
        // },
      });
      console.log("objectdata",data);
      // Kullanıcı bilgisini tarayıcı hafızasına (sessionStorage) kaydediyoruz
      // setCurrentUser(data);
      // sessionStorage.setItem("user", JSON.stringify(data));
      // Giriş başarılı olduğunda ana sayfaya yönlendiriyoruz
      setCurrentUser(data.userID);
      sessionStorage.setItem("user", data.userID);
      // sessionStorage.setItem("user", JSON.stringify(data.userID));

      navigate("/");
      return true;
    } catch (error) {
      console.error(error);
      navigate("/");
      return false;
    }
  };

  const logoutPerson = () => {
    setCurrentUser(false);
    // localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };


  const updatePerson = async (userId, updateData) => {
    const createData = new FormData();
    createData.append("name", updateData.name);
    createData.append("country", updateData.country);
    createData.append("city", updateData.city);
    createData.append("phone", updateData.phone);
    createData.append("about", updateData.about);
    try {
      const { data } = await axios.post(`${UPDATE_API_URL}?user_id=${userId}&token=${MY_TOKEN}`, createData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setCurrentUser(data.user);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

// ................login/register model.............................
 const [currentForm, setCurrentForm] = useState("login");
  const [showModal, setShowModal] = useState(false);
  const toggleForm = (formName) => {
    setCurrentForm(formName);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


// ......................................................
  const contextValues = {
    loginPerson,
    registerPerson,
    logoutPerson,
    currentUser,
    setCurrentUser,
    updatePerson,
    toggleForm,
    handleCloseModal,
    showModal,
    setShowModal,
    currentForm,
    setCurrentForm,

  };
   
  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
}
