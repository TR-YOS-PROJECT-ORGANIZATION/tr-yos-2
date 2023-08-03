import axios from "axios";
import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

const Passaword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

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
        console.log("Password changed successfully");
      } else {
        console.log("An error occurred while changing password");
      }
    } catch (error) {
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
            Current Password*
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
            New Password*
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
            Repeat New Password*
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
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Passaword;

