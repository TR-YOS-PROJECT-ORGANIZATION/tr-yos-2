import React, { useState } from "react";
import "../Style/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useTranslation } from 'react-i18next';
import { FaGoogle } from 'react-icons/fa';
import ToastComponent from "../toastComponent/ToastComponent";

const LogIn = () => {

  const { t } = useTranslation();

  const { loginPerson,toggleForm,handleCloseModal ,showErrorToast,showSuccessToast,setShowSuccessToast,setShowErrorToast } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isLogined = await loginPerson({
      email: email,
      password: password,
    });
    if (isLogined) {
      setEmail("");
      setPassword("");
      navigate("/"); // İlgili sayfaya 
    
      handleCloseModal(false)
    } else {
      // Hata mesajını göster
     
      console.log("Login failed!");
    }
  };

  // Kayıt başarılıysa yönlendir

  // const [showSignInModal, setShowSignInModal] = useState(false);

  // const toggleShowSignInModal = () => setShowSignInModal(!showSignInModal);

  // const location =useLocation()

  return (
   
      <form
        className="   p-3 w-100 h-100 login-form "
        onSubmit={(e) => handleSubmit(e)}
      >
      <h2 className="loginTitle">{t('logIn.signIn')}</h2>
        <div className="form-group w-100 mt-3 inputBox">
          <input
            type="text"
            className="form-control"
            id="UserEmail"
            aria-describedby="emailHelp"
          placeholder={t('logIn.userEmail')}

            value={email}
            onChange={(e) => setEmail(e.target.value)} // Input alanı değiştiğinde eposta değerini güncelliyoruz.
          />
          
        </div>
        <div className="form-group w-100 mt-3 inputBox">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          placeholder={t('logIn.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Input alanı değiştiğinde şifre değerini güncelliyoruz.
          />
         
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-5"
    
        
        >
        {t('logIn.logIn')}
        </button>

        <div className="d-flex justify-content-around  mt-5 ">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
            {t('logIn.savePassword')}
            </label>
          </div>
          <Link
            style={{ textDecoration: "none" }} //   onClick={() => forgotPassword(email)}
          >
          {t('logIn.forgetPassword')}
          </Link>
        </div>

        <div className=" h-100 text-center mt-5">
          <hr />
         
          <p>
          {t('logIn.signUpQuestion')}
            <button 
              className=" btnSgn text-primary mx-2"
              style={{ textDecoration: "none" }}
              onClick={() => toggleForm('register')}
            >
            
            {t('logIn.signUp')}
            </button>
 
          </p>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          {" "}
          <button
            className=" btn btn-primary mt-3 py-1"
            type="button"
            
          >

<FaGoogle size={20} color="red" />
<span className="mx-1 "></span>
          {t('logIn.continueWithGoogle')}
            
          </button>
        </div>

      </form>

      
    // </div>
  );
};
export default LogIn;










// import React, { useState } from "react";
// import "../Style/Login.css";
// import { Link, useNavigate } from "react-router-dom";
// import { Modal } from "react-bootstrap"; // Modal bileşenini import edelim
// import { useAuthContext } from "../../context/AuthContext";

// const LogIn = () => {
//   const { loginPerson } = useAuthContext();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const isLogined = await loginPerson({
//       email: email,
//       password: password,
//     });
//     if (isLogined) {
//       setEmail("");
//       setPassword("");
//       navigate("/"); // İlgili sayfaya yönlendir
//     } else {
//       // Hata mesajını göster
//       console.log("Login failed!");
//     }
//   };

//   // Kayıt başarılıysa yönlendir

//   const [showSignInModal, setShowSignInModal] = useState(false);

//   const toggleShowSignInModal = () => setShowSignInModal(!showSignInModal);

//   // const location =useLocation()

//   return (
//     <div className="container box d-flex flex-column align-items-center mt-3   col-4 h-75  login-container center">
//       <form
//         className="   px-3 w-100 h-100 login-form "
//         onSubmit={(e) => handleSubmit(e)}
//       >
//         <h2 className="mt-1 ">Sing In</h2>
//         <div className="form-group w-100 mt-3 inputBox">
//           <input
//             type="text"
//             className="form-control"
//             id="UserEmail"
//             aria-describedby="emailHelp"
//             placeholder="User Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)} // Input alanı değiştiğinde eposta değerini güncelliyoruz.
//           />
//         </div>
//         <div className="form-group w-100 mt-3 inputBox">
//           <input
//             type="password"
//             className="form-control"
//             id="exampleInputPassword1"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)} // Input alanı değiştiğinde şifre değerini güncelliyoruz.
//           />
//         </div>
//         <button type="submit" className="btn btn-primary w-100 mt-5">
//           Log In
//         </button>

//         <div className="d-flex justify-content-around  mt-5 ">
//           <div className="form-check">
//             <input
//               type="checkbox"
//               className="form-check-input"
//               id="exampleCheck1"
//             />
//             <label className="form-check-label" htmlFor="exampleCheck1">
//               Save Password
//             </label>
//           </div>
//           <Link
//             style={{ textDecoration: "none" }} //   onClick={() => forgotPassword(email)}
//           >
//             Forget Password
//           </Link>
//         </div>

//         <div className=" h-100 text-center mt-5">
//           <hr />

//           <p>
//             Don't have an account yet?
//             <a
//               href="/register"
//               className="text-primary mx-2"
//               style={{ textDecoration: "none" }}
//             >
//               {" "}
//               Sign Up
//             </a>
//             {/* <Button
//               className="btn btn-outline-light my-4 py-1 px-1 m-1 flex-wrap"
//               type="submit"
//               variant="info"
//               onClick={toggleShowSignInModal} // Modalı göstermek için fonksiyonu çağıralım
//             >
//               Sing Up
//             </Button> */}
//           </p>
//         </div>
//         <div className="d-flex justify-content-center align-items-center">
//           {" "}
//           <button
//             className=" btn btn-primary mt-3 py-1"
//             type="button"
//             // onClick={() => signUpProvider()}
//           >
//             Continue with Google
//             {/* <GoogleIcon color="currentColor" /> */}
//           </button>
//         </div>
//       </form>

//       {/* Modal bileşenini ekleyelim */}
//       <Modal show={showSignInModal} onHide={toggleShowSignInModal}>
//         {/* Buraya modal içeriğini yazabilirsiniz */}
//       </Modal>
//     </div>
//   );
// };
// export default LogIn;
