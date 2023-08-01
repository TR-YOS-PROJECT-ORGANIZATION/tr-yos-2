
import React, { useState } from "react";
import "../Style/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useTranslation } from 'react-i18next';
import { Modal } from "react-bootstrap";
import { FaGoogle } from 'react-icons/fa';

const Register = ({setShowSignUpModal,handleSignInClick}) => {
  const { t } = useTranslation();
  const { registerPerson } = useAuthContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isRegistered = await registerPerson({
      name: name,
      email: email,
      password1: password1,
      password2: password2,

    });

    
  
    // Kayıt başarılıysa yönlendir
    if (isRegistered) {
      setName("");
      setEmail("");
      setPassword1("");
      setPassword2("");
      navigate("/"); // İlgili sayfaya yönlendir
      setShowSignUpModal(false); 
    } else {
      // Hata mesajını göster
      console.log("Registration failed!")
    }
  };
  
  // const [showSignUpModal, setShowSignUpModal] = useState(false);

  // const toggleShowSignUpModal = () => setShowSignUpModal(!showSignUpModal);


  return (
    // <div className="container d-flex flex-column align-items-center mt-5 col-4 h-75 py-5 container-signup ">
  
      <form
        className="  p-3  h-100 "
        onSubmit={handleSubmit}
      >
      <h2>{t('register.signUp')}</h2>
        <div className="form-group w-100 mt-3 inputBox">
          <input
            type="text"
            className="form-control"
            id="yourname"
            aria-describedby="emailHelp"
          placeholder={t('register.userName')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group w-100 mt-3 inputBox">
          <input
            type="email"
            className="form-control"
            id="emial"
            aria-describedby="emailHelp"
          placeholder={t('register.userEmail')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group w-100 mt-3 inputBox">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          placeholder={t('register.password')}
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
        </div>
        <div className="form-group w-100 mt-3 inputBox">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          placeholder={t('register.rePassword')}
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>

        <button type="submit"
          
         className="btn btn-primary w-100 mt-5">
        {t('register.signUp')}
        </button>

        <div className="d-flex justify-content-around  mt-5 ">
          <hr />
          <div className="">
          <div>
            {t('register.signInQuestion')}{" "}
              <button
              onClick={handleSignInClick}
              className="text-primary mx-2" style={{ textDecoration: "none" }}>
              {t('register.signIn')}
                
          </button>
             
            </div>
          </div>
        </div>
       
        <div className="d-flex justify-content-center align-items-center"> 
          <button
            className=" btn btn-primary mt-3 py-1"
            type="button"
            // onClick={() => signUpProvider()}
          >

<FaGoogle size={20} color="red" />
<span className="mx-1 "></span>
          {t('register.continueWithGoogle')}
            
          </button>
          </div>
      </form>

  );
};

export default Register





// import React, { useState } from "react";
// import "../Style/Signup.css";
// import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "../../context/AuthContext";
// import { Modal } from "react-bootstrap";

// const Register = () => {
//   const { registerPerson } = useAuthContext();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password1, setPassword1] = useState("");
//   const [password2, setPassword2] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const isRegistered = await registerPerson({
//       name: name,
//       email: email,
//       password1: password1,
//       password2: password2,

//     });
  
//     // Kayıt başarılıysa yönlendir
//     if (isRegistered) {
//       setName("");
//       setEmail("");
//       setPassword1("");
//       setPassword2("");
//       navigate("/"); // İlgili sayfaya yönlendir
//     } else {
//       // Hata mesajını göster
//       console.log("Registration failed!")
//     }
//   };
//   const [showSignUpModal, setShowSignUpModal] = useState(false);


//   // const [showSignUpModal, setShowSignUpModal] = useState(false);


//   const toggleShowSignUpModal = () => setShowSignUpModal(!showSignUpModal);

//   return (
//     <div className="container d-flex flex-column align-items-center mt-5 col-4 h-75 py-5 container-signup ">
//       <h2>Sign Up</h2>
//       <form
//         className="border py-5 px-3 w-100 h-100 "
//         onSubmit={handleSubmit}
//       >
//         <div className="form-group mb-3 ">
//           <input
//             type="text"
//             className="form-control"
//             id="yourname"
//             aria-describedby="emailHelp"
//             placeholder="User Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className="form-group w-100">
//           <input
//             type="email"
//             className="form-control"
//             id="emial"
//             aria-describedby="emailHelp"
//             placeholder="User Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className="form-group w-100 mt-3">
//           <input
//             type="password"
//             className="form-control"
//             id="exampleInputPassword1"
//             placeholder="Password"
//             value={password1}
//             onChange={(e) => setPassword1(e.target.value)}
//           />
//         </div>
//         <div className="form-group w-100 mt-3">
//           <input
//             type="password"
//             className="form-control"
//             id="exampleInputPassword1"
//             placeholder="RePassword"
//             value={password2}
//             onChange={(e) => setPassword2(e.target.value)}
//           />
//         </div>

//         <button type="submit"
          
//          className="btn btn-primary w-100 mt-3">
//           Sign Up
//         </button>

//         <div className="">
//           <hr />
//           <div className="">
//             <p>
//               Already have an account?{" "}
//               <a href="/Login" className="text-primary mx-2" style={{ textDecoration: "none" }}>
//                 Sign In
//               </a>
//             </p>
//           </div>
//         </div>
//       </form>
//       <Modal 
//       // show={success} onHide={() => { /* Function to hide modal */ }}
//       show={showSignUpModal} onHide={toggleShowSignUpModal}
//       >
//         {/* Modal content here */}
//       </Modal>

      

//     </div>
//   );
// };

// export default Register;


//   );
// };

// export default Register;

