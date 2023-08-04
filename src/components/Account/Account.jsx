import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
import { useTranslation } from 'react-i18next';
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/Account.css";
import Passaword from "./Passaword";

const Account = () => {
  const { t } = useTranslation();

  const [accountCities, setAccountCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const { updatePerson, currentUser } = useAuthContext();

  const YOUR_TOKEN =
    "SX2qL5O3ivipPSMIWN8nXnaLWOiy4cEq7UdgZk448T5ZDpT1qbgMIrXVNquP1CWyNAH3JvoEVqnjiyg20a17549275a86d0e835660e56847e87a";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCountries = await axios.get(
          `https://tr-yös.com/api/v1/location/allcountries.php?token=${YOUR_TOKEN}`
        );
        setCountries(responseCountries.data);
        const turkey = responseCountries.data.find(
          (country) => country.en.toLowerCase() === "turkey"
        );
        setSelectedCountryId(turkey.id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCountryId) {
      const fetchCitiesByCountry = async () => {
        try {
          const responseCities = await axios.get(
            `https://tr-yös.com/api/v1/location/citiesbycountry.php?country_id=${selectedCountryId}&token=${YOUR_TOKEN}`
          );
          setAccountCities(responseCities.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchCitiesByCountry();
    }
  }, [selectedCountryId]);

  const handleCountryChange = (event) => {
    const selectedCountryId = event.target.value;
    setSelectedCountryId(selectedCountryId);
  };

  const person = {
    name: "John Doe",
    tel: "+90 555 123 45 67",
    email: "johndoe@example.com",
    img: "https://cdn.create.vista.com/api/media/small/3971976/stock-photo-young-child",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.elements.inputText.value;
    const email = event.target.elements.inputEmail.value;
    const country = event.target.elements.inputCountry.value;
    const city = event.target.elements.inputCity.value;
    const phone = event.target.elements.phone.value;
    const about = event.target.elements.aboutTextarea.value;

    const updateData = {
      name: name,
      email: email,
      country: country,
      city: city,
      phone: phone,
      about: about,
    };

    const currentUser = JSON.parse(sessionStorage.getItem("user")); // sessionStorage'dan kullanıcı bilgilerini alıyoruz
    const userId = currentUser && currentUser.userID; // Kullanıcı bilgileri varsa userId'yi alıyoruz

    if (userId) {
      const result = await updatePerson(userId, updateData);
      if (result) {
        alert(t('account.successfullyUpdated'));
      } else {
        alert(t('account.errorUpdating'));
      }
    } else {
      alert(t('account.noUserLoggedIn'));
    }

  };



  return (
    <div className="">
      <div className="infoDiv  p-5 mb- bg-primary text-white">
        <h2 className=" fw-bold mx-5 pt-5">{t('account.myAccount')}</h2>
      </div>
     
           <div className="">
        <h1 className="text-center p-5">{t('account.myAccount')}</h1>
      </div>

      <div className="account_container p-2 d-flex justify-content-around  ">
        {/* <----------------------Profi Area Start-----------------------> */}
        <div
          className=" card w-25 bg-white border-0 shadow-lg p-3 mb-5  rounded"
          style={{ width: "18rem" }}>
          <img
            src={person.img}
            className="card-img-top card__image"
            alt="..."
          />
          <div className="card-body text-center w-100">
            <h5 className="card-title">{person.name}</h5>
            <p className="card-text">{person.email}</p>
            <div class="">
              <button class="btn_primary p-3 w-100 mt-2" type="button">
                {person.tel}
              </button>

              <button class="btn_success  p-3 w-100 mt-2" type="button">
                {person.email}
              </button>
            </div>
          </div>
          <div className="mt-1 p-3 ">
            <button className="button-24 " role="button">
              <i class="fa-solid fa-gauge-high"></i> {t('account.dashboard')} <span></span>
            </button>
            <button className="button-24" role="button">
              <i class="fa-regular fa-user"></i>{t('account.myProfile')}
            </button>
            <button className="button-24" role="button">
              <i class="fa-solid fa-envelope"></i> {t('account.message')} <span></span>
            </button>
            <button className="button-24" role="button">
              <i class="fa-solid fa-unlock"></i> {t('account.changePassword')}
            </button>
          </div>
        </div>

        {/* <----------------------Profil Area End-----------------------> */}

        {/* <----------------------Form Area Start Hakan Bilgi-----------------------> */}
        <div
          className="card w-75 bg-white border-0 shadow-lg p-3 mb-5 rounded mx-1"
          style={{ width: "18rem" }}>
          <form className="row g-4" onSubmit={handleSubmit}>
            <div className="col-md-6 ">
              <label htmlFor="inputText" className="form-label">
                {t('account.yourName')}*
              </label>
              <input
                type="inputText"
                className="form-control p-3"
                id="inputText"
                required
                defaultValue={currentUser.name}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputEmail" className="form-label">
                {t('account.email')}*
              </label>
              <input
                type="email"
                className="form-control p-3"
                id="inputEmail"
                required
                defaultValue={currentUser.email}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCountry" className="form-label">
                {t('account.country')}*
              </label>
              <select
                id="inputCountry"
                className="form-select p-3"
                required
                onChange={handleCountryChange}
                defaultValue={currentUser.country}
              >
                <option selected disabled value="">
                  {t('account.selectCountry')}
                </option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.en}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCity" className="form-label">
                City*
              </label>
              <select id="inputCity" className="form-select p-3" required defaultValue={currentUser.city}>
                <option selected disabled value="">
                  {t('account.selectCity')}
                </option>
                {accountCities.map((city) => (
                  <option key={city.id} value={city.en}>
                    {city.en}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="phone" className="form-label">
                {t('account.phone')}
              </label>
              <input type="text" className="form-control p-3" id="phone" defaultValue={currentUser.phone} />
            </div>
            <div className="mb-3">
              <label for="aboutTextarea" class="form-label">
                {t('account.about')}
              </label>
              <textarea
                class="form-control"
                id="aboutTextarea"
                rows="5"
                defaultValue={currentUser.about}
              ></textarea>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary p-3">
                {t('account.saveChanges')}
              </button>
            </div>
          </form>
        {/* <----------------------Form Area End Hakan Bilgi----------------------> */}
        <hr/>
         {/* <---------------------- Password Area--------------------> */}
         <Passaword/>
      </div>
        </div>

    </div>
        );
};

export default Account;
