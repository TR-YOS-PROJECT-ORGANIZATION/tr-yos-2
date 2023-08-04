import React, { useEffect, useState } from "react";
import { useYosContext } from "../../context/Context";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Compare = () => {
  const { compareId, setCompareId, card } = useYosContext();
  const [cardCompare, setCardCompare] = useState([]);
  const [deleteProps, setDeleteProps] = useState(false);
  const { currentUser } = useAuthContext();
  useEffect(() => {
    const matchedCards = compareId.map((compareItem) => {
      const matchingCard = card.find(
        (cardItem) => cardItem.id === compareItem.id
      );
      return matchingCard;
    });

    setCardCompare(matchedCards);
  }, [compareId, card, deleteProps]);

  const deleteCompare = async (prop) => {
    setDeleteProps(!deleteProps);
    try {
      const responseCompareDelete = await axios.get(
        `https://tr-yös.com/api/v1/users/deletecompare.php`,
        {
          params: {
            id: `${prop}`,

            user_id: currentUser,
            token:
              "SX2qL5O3ivipPSMIWN8nXnaLWOiy4cEq7UdgZk448T5ZDpT1qbgMIrXVNquP1CWyNAH3JvoEVqnjiyg20a17549275a86d0e835660e56847e87a",
          },
        }
      );
      setCompareId((prevCompareId) =>
        prevCompareId.filter((id) => id.id !== prop)
      );
      console.log("delete", responseCompareDelete.data);
    } catch (error) {
      console.log("delete Hatasi", error);
    }
  };

  return (
    <div>
      <div className="p-5 mb-2 bg-primary text-white">
        <h2 className="p-title fw-bold mx-5">Compare</h2>
      </div>
      <div className="d-grid gap-3">
        {cardCompare.map((item) => {
          return (
            <div className="card" style={{ width: "18rem" }}>
              <button onClick={() => deleteCompare(item.id)}>
                <strong>X sil</strong>
              </button>
              <img
                className="card-img-top"
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dW5pdmVyc2l0eXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">{item["university"]["tr"]}</h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{item["faculty"]["tr"]}</li>
                <li className="list-group-item">
                  <Link key={item?.id} to={`/universities/${item.id}`}>
                    {item["department"]["tr"]}
                  </Link>
                </li>
                <li className="list-group-item">{item["city"]["tr"]}</li>
              </ul>
              <div className="card-body">
                {/* <a href="#" className="card-link">
                  Card link
                </a>
                <a href="#" className="card-link">
                  Another link
                </a> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Compare;
