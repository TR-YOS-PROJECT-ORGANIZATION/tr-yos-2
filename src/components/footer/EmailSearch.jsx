import React, { useState } from "react";
import "../Style/EmailSearch.css";
import { useTranslation } from "react-i18next";
import axios from "axios";

const EmailSearch = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  console.log("EMAİL", email);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append("email", email);

    const url =
      "https://tr-yös.com/api/v1/record/addemail.php?token=SX2qL5O3ivipPSMIWN8nXnaLWOiy4cEq7UdgZk448T5ZDpT1qbgMIrXVNquP1CWyNAH3JvoEVqnjiyg20a17549275a86d0e835660e56847e87a";
try {
  const responseEmail = await axios.post(url,formData,{
    headers: {
     
      "Content-Type": "multipart/form-data",
     }
  });
  console.log(responseEmail.data);
} catch (error) {
  console.log(error);
}
    
  };

  return (
    <main className="cont">
      <div className="d-flex align-items-center justify-content-center flex-column">
        <h1 className="email-h1">{t("emailSearch.workingWithUs")}</h1>
        <marquee className="email-p m-5 d-block fs-3">
          {t("emailSearch.message")}
          <span className="m-2 d-block"></span>
        </marquee>
      </div>

      <div className="SearchBox">
      <form  className="d-flex" onSubmit={(e)=>handleSubmit(e)}>
        <input
          type="text"
          className="SearchBox-input email-input"
          placeholder={t("emailSearch.enterEmail")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="SearchBox-button email-button">
        
          <i className="SearchBox-icon  material-icons">
            {t("emailSearch.subscribe")}
          </i>
        </button>
        </form>
      </div>
    </main>
  );
};

export default EmailSearch;
