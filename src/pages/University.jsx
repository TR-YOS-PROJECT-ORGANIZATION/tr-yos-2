import "../components/Style/University.css";
import { useState } from "react";
import { useYosContext } from "../context/Context";
import UniversityCard from "../components/university/UniversityCard";

const University = () => {
  const { universities } = useYosContext();
  const itemsPerPage = 10; // Her sayfada gösterilecek üniversite sayısı
  const [currentPage, setCurrentPage] = useState(1);

  // Aktif sayfada gösterilecek üniversiteleri hesaplayan fonksiyon
  const getVisibleUniversities = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return universities.slice(startIndex, endIndex);
  };

  // Toplam sayfa sayısını hesaplayan fonksiyon
  const totalPages = Math.ceil(universities.length / itemsPerPage);

  // Sayfa değiştirme işlevi
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Sayfa numaralarının listesi
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="">
      <div className="info-div p-5 mb-2 bg-primary text-white ">
        <h2 className=" page-title mt-5 fw-bold mx-5">Universites</h2>
        <span className="fw-small mx-5">
          You Can Check All Universities
        </span>
      </div>

      {/* Üniversite kartları */}
      <div>
        {getVisibleUniversities().map((item) => (
          <UniversityCard {...item} key={item.id} />
        ))}
      </div>

      {/* Sayfa numaralarının butonları */}
      <div className="pagination p-4">
        <button
          className="back"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i className="bi bi-caret-left-fill"></i>
          back
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={currentPage === number ? "active" : ""}
          >
            {number}
          </button>
        ))}
        <button
          className="next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          next
          <i className="bi bi-caret-right-fill"></i>
        </button>
      </div>
    </div>
  );
};

export default University;