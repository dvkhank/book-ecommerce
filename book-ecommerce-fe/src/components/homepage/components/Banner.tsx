const Banner = () => {
  return (
    <div
      style={{ backgroundColor: "#8B7355" }}
      className=" text-white text-center py-5 px-3"
    >
      <h1 className="display-4 fw-bold">Welcome to Our Website</h1>
      <p className="lead fw-semibold">
        Discover new insights and enjoy a better learning experience with us.
      </p>
      <button className="btn btn-light btn-lg mt-3">Get Started</button>
    </div>
  );
};

export default Banner;
