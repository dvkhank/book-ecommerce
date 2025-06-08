import React from "react";

const Carousel = () => {
  return (
    <div
      id="carouselExampleInterval"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="10000">
          <div className="row align-items-center">
            <div className="col-5">
              <img
                src="images/banner/anh1.jpeg"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="col-7 d-flex flex-column justify-content-center p-4 p-md-5 text-start">
              <h5 className="display-6 fw-bold mb-3 text-primary">
                Welcome to Our Platform
              </h5>
              <p className="fs-5 text-muted">
                Discover high-quality books and seamless shopping experience
                tailored for English learners.
              </p>
            </div>
          </div>
        </div>
        <div className="carousel-item active" data-bs-interval="10000">
          <div className="row align-items-center">
            <div className="col-5">
              <img
                src="images/banner/anh2.jpeg"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="col-7 d-flex flex-column justify-content-center p-4 p-md-5 text-start">
              <h5 className="display-6 fw-bold mb-3 text-primary">
                Welcome to Our Platform
              </h5>
              <p className="fs-5 text-muted">
                Discover high-quality books and seamless shopping experience
                tailored for English learners.
              </p>
            </div>
          </div>
        </div>
        <div className="carousel-item active" data-bs-interval="10000">
          <div className="row align-items-center">
            <div className="col-5">
              <img
                src="images/banner/anh3.jpeg"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="col-7 d-flex flex-column justify-content-center p-4 p-md-5 text-start">
              <h5 className="display-6 fw-bold mb-3 text-primary">
                Welcome to Our Platform
              </h5>
              <p className="fs-5 text-muted">
                Discover high-quality books and seamless shopping experience
                tailored for English learners.
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
