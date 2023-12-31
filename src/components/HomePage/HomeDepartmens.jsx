import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import HomeCard from "./HomeCard";
import { Col, Container, Row } from "react-bootstrap";
import { useYosContext } from "../../context/Context";

const HomeDepartmens = () => {
  const { t } = useTranslation();
  const { universities, card, setCompare, compare, user } = useYosContext();


  const [loading, setLoading] = useState(true);

  const [random12Cards, setRandom12Cards] = useState([]); // State to store random cards

  useEffect(() => {
    const shuffledCards = card.sort(() => 0.5 - Math.random());
    const selectedCards = shuffledCards.slice(0, 12);
    setRandom12Cards(selectedCards);
    setTimeout(() => {
      setLoading(false); // After the async operation, set loading to false
    }, 1000)

  }, [card]);

  const universityImages = universities.reduce((map, university) => {
    if (university && university.images && university.images.length > 0) {
      map[university.tr] = university.images;
    }
    return map;
  }, {});



  return (
 

    <Container className="rounded-4 mt-4  ">
      {loading && (
        <div className="loading-indicator"
        
        
        >
          <i class="fa-solid fa-arrows-rotate fa-spin fa-2xl"></i>
          <span  className="mx-1"></span>
          <p>Loading...</p>
        </div>
        
      )}
      <h1 className="my-2 text-center" style={{ color: "#16193B" }}>
        {" "}
        <strong> {t('homeDepartments.title')}</strong>
      </h1>

      <marquee className="text-center" style={{ color: "#B2BEBF",fontSize:"30px" }}>
        {t('homeDepartments.subTitle')}
      </marquee>

      <Row className="g-1 d-flex flex-wrap">
        {random12Cards?.map((item, index) => {
          return (
            <Col xs={12} md={6} lg={4} xl={4} key={item.id}>
              <HomeCard
                item={item}
                universityImage={universityImages}
               
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default HomeDepartmens;
