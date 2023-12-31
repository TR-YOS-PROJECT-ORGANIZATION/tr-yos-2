import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../context/AuthContext";
import ToastComponent from "../toastComponent/ToastComponent";

const Passaword = () => {
  const { t } = useTranslation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
    const {currentUser}=useAuthContext()
    console.log("pasas",currentUser);
  const MY_TOKEN =
    "SX2qL5O3ivipPSMIWN8nXnaLWOiy4cEq7UdgZk448T5ZDpT1qbgMIrXVNquP1CWyNAH3JvoEVqnjiyg20a17549275a86d0e835660e56847e87a";
// Kullanıcının user_id'si
  const url = `https://tr-yös.com/api/v1/users/changepassword.php?user_id=${currentUser}&token=${MY_TOKEN}`;

  const updatePassword = async () => {
    if (newPassword !== repeatPassword) {
      return alert(`Passwords do not match`);
    }
    try {
      const formData = new FormData();
      formData.append("password_current", currentPassword);
      formData.append("password_new1", newPassword);
      formData.append("password_new2", repeatPassword);
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status === "success") {
        setShowSuccessToast(true);
        setCurrentPassword("");
        setNewPassword("");
        setRepeatPassword("");
      } 
    } catch (error) {
      setShowErrorToast(true);
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Giriş alanlarındaki değerleri güncellemek yerine updatePassword fonksiyonunu çağırıyoruz
    updatePassword();
  };

  return (
    <div className="w-100">
      <hr style={{ width: "100%" }} />
      <form className="row g-4" onSubmit={handleSubmit}>
        <div className="col-8">
          <label htmlFor="inputText" className="form-label">
            {t('password.currentPassword')}*
          </label>
          <input
            type="password"
            className="form-control p-3"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="col-8">
          <label htmlFor="inputEmail" className="form-label">
            {t('password.newPassword')}*
          </label>
          <input
            type="password"
            className="form-control p-3"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="col-8">
          <label htmlFor="inputEmail" className="form-label">
            {t('password.repeatNewPassword')}*
          </label>
          <input
            type="password"
            className="form-control p-3"
            required
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary p-3">
            {t('password.saveChange')}
          </button>
        </div>
      </form>
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{ position: "relative", minHeight: "200px" }}
      >
        {/* Success Toast */}
        <ToastComponent
          show={showSuccessToast}
          onClose={() => setShowSuccessToast(false)}
          type="success"
          message={t("toasts.passwordChanged")}
        />

        {/* Error Toast */}
        <ToastComponent
          show={showErrorToast}
          onClose={() => setShowErrorToast(false)}
          type="error"
          message={t("toasts.passwordChangeError")}
        />
      </div>
    </div>
    
  );
};

export default Passaword;

