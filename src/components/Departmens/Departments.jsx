
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-select";
import "../Style/Departmants.css";

import { useLocation } from "react-router";


import { useYosContext } from "../../context/Context";


import DepartmentsCard from "../Departmens/DepertmentsCard";
import HomeCard from "../HomePage/HomeCard";

const Departments = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const { selectedCityIds, selectedUniversityIds, selectedDepartmentIds } =
    location.state || {};

  const { card, cities, universities, departments } = useYosContext();

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
  const citiesOptions = cities?.map((city) => ({
    value: city.id,
    label: city.en,
    key: city.id,
  }));
  const universitiesOptions = universities?.map((university) => ({
    value: university.code,
    label: university.en,
    key: university.id,
  }));
  const departmentsOptions = departments?.map((department) => ({
    value: department.department.code,
    label: department.department.en,
    key: department.id,
  }));
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const [selectedCities, setSelectedCities] = useState(
    selectedCityIds?.map((cityId) =>
      citiesOptions?.find((option) => option.value === cityId)
    )
  );
  const [selectedUniversities, setSelectedUniversities] = useState(
    selectedUniversityIds?.map((universityId) =>
      universitiesOptions?.find((option) => option.value === universityId)
    )
  );
  const [selectedDepartments, setSelectedDepartments] = useState(
    selectedDepartmentIds?.map((departmentId) =>
      departmentsOptions?.find((option) => option.value === departmentId)
    )
  );

  const handleCityChange = (selectedOptions) => {
    setSelectedCities(selectedOptions);
    const selectedCityIds = selectedOptions?.map((option) => option.value);
    const filteredUnis = universities?.filter((university) =>
      selectedCityIds?.includes(university.city)
    );
    setFilteredUniversities(filteredUnis);
  };

  const handleUniversityChange = (selectedOptions) => {
    setSelectedUniversities(selectedOptions);
    const selectedUniversityIds = selectedOptions?.map(
      (option) => option.value
    );
    const filteredDeps = departments?.filter((department) =>
      selectedUniversityIds?.includes(department?.university?.code)
    );
    setFilteredDepartments(filteredDeps);
  };

  const handleDepartmentChange = (selectedOptions) => {
    setSelectedDepartments(selectedOptions);
  };



//card oluşturma............

const filteredUniversitiesCard = selectedUniversityIds?.length
? departments
    ?.filter((item) => selectedUniversityIds.includes(item.university.code))
    .map((item) => ({
      ...item,
      label: item.department.en,
      value: item.department.code,
    }))
: departments.map((item) => ({
    ...item,
    label: item.department.en,
    value: item.department.code,
  }));

const filteredDepartmentsCard = filteredUniversitiesCard?.filter((item) =>
selectedDepartmentIds?.includes(item.department.code)
);

//................................................


  return (
    <div>
      <div className="infoDiv mt-5 p-5 mb-2 bg-primary text-white" >
        <h3 className=" page-title fw-bold mx-5">{t('departments.title')}</h3>
      </div>
      <Container>
        <Row className="d-flex ">
          <div className="d-flex ">
            <Col xs={0} md={0} lg={4} xl={3}>
              <Form className="d-none d-lg-block row w-100 mt-5 p-3 text-start  bg-body rounded-4  align-items-center border d-inline-flex">
                <div className="select col-12  mb-3 ">
                  <Select
                    placeholder={t('departments.selectCity')}
                    onChange={handleCityChange}
                    options={cities?.map((city) => ({
                      value: city.id,
                      label: city.en,
                      key: city.id,
                    }))}
                    isMulti
                    value={selectedCities}
                  />
                </div>
                <div className="select col-12 mb-3 ">
                  <Select
                    placeholder={t('departments.selectUniversity')}
                    className="w-100"
                    onChange={handleUniversityChange}
                    options={filteredUniversities?.map((university) => ({
                      value: university.code,
                      label: university.en,
                      key: university.id,
                    }))}
                    isMulti
                    value={selectedUniversities}
                  />
                </div>
                <div className="select col-12 mb-3 ">
                  <Select
                    placeholder={t('departments.selectDepartment')}
                    className="w-100"
                    options={filteredDepartments?.map((department) => ({
                      value: department.department.code,
                      label: department.department.en,
                      key: department.id,
                    }))}
                    isMulti
                    value={selectedDepartments}
                    onChange={handleDepartmentChange}
                  />
                </div>
                <div className="d-flex align-items-center">
                  <Form.Group className="flex-grow-1">
                    <Form.Control
                      type="text"
                      placeholder={t('departments.minPrice')}
                      className="p-3"
                    />
                  </Form.Group>
                  <span className="mx-2"></span>
                  <Form.Group className="flex-grow-1">
                    <Form.Control
                      type="text"
                      placeholder={t('departments.maxPrice')}
                      className="p-3"
                    />
                  </Form.Group>
                </div>

                <div className="d-flex justify-content-between mt-2"></div>
                <Button variant="primary" type="submit" className="p-3 mt-4">
                  {t('departments.submitSearch')}
                </Button>
              </Form>
            </Col>
            <Col xs={12} sm={12} md={12} lg={8} xl={9}>
              <Container className="rounded-4 mt-2 p-4 ">
              <Row className="g-3 d-flex flex-wrap">



{filteredDepartmentsCard?.length > 0
                    ? filteredDepartmentsCard?.map((item) => (
                        <Col sm={6} md={6} lg={6} key={item.id}>
                          {selectedCityIds && selectedDepartmentIds && selectedUniversityIds && selectedCities && selectedUniversities && selectedDepartments && (
                          <DepartmentsCard
                            item={item}
                      
                          /> )}
                        </Col>
                      ))
                    : random12Cards?.map((item) => (
                        <Col sm={6} md={6} lg={6} key={item.id}>
                          <HomeCard
                            item={item}
                            universityImage={universityImages}
                          />
                        </Col>
                      ))}

            </Row>     
              </Container>
            </Col>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Departments;

