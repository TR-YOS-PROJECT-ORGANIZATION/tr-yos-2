import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import HomeCard from "./HomeCard";
import { Col, Container, Row } from "react-bootstrap";
import { useYosContext } from "../../context/Context";

const HomeDepartmens = () => {
  const { t } = useTranslation();
  const { universities, card, setCompare, compare, user } = useYosContext();

  // const shuffledCards = card.sort(() => 0.5 - Math.random());
  // const random12Cards = shuffledCards.slice(0, 12);


  const [random12Cards, setRandom12Cards] = useState([]); // State to store random cards

  useEffect(() => {
    const shuffledCards = card.sort(() => 0.5 - Math.random());
    const selectedCards = shuffledCards.slice(0, 12);
    setRandom12Cards(selectedCards);
  }, [card]);




  const universityImages = universities.reduce((map, university) => {
    if (university && university.images && university.images.length > 0) {
      map[university.tr] = university.images;
    }
    return map;
  }, {});



  return (
 

    <Container className="rounded-4 mt-4  ">
      <h1 className="my-2 text-center" style={{ color: "#16193B" }}>
        {" "}
        <strong> {t('homeDepartments.title')}</strong>
      </h1>

      <h6 className="text-center" style={{ color: "#B2BEBF" }}>
        {t('homeDepartments.subTitle')}
      </h6>

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
