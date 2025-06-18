import { useEffect, useState } from "react";
import api from "../../api/api";
import { NavLink } from "react-router-dom";
import cookie from "react-cookies";

/* eslint-disable jsx-a11y/anchor-is-valid */
interface NavBarInterface {
  onSearch: (keyword: string) => void;
  onSelectedGenre: (genreId: number | null) => void;
}
interface Genre {
  id: number;
  genreName: string;
}
const Navbar: React.FC<NavBarInterface> = (props) => {
  const [genres, setGenres] = useState<Genre[]>();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const handFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSearch(searchTerm);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    api
      .get("/genres")
      .then((res) => setGenres(res.data._embedded.genres))
      .catch((error) => console.error(error));
  }, []);
  const cart = cookie.load("cart");

  return (
    <div>
      <nav
        style={{ backgroundColor: "#f5f5dc" }}
        className="navbar navbar-expand-lg"
      >
        <div className="container-fluid">
          <NavLink className="navbar-brand" to={"/"}>
            Book Ecommerce
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to={"/"}
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Genres
                </a>
                <ul className="dropdown-menu">
                  {genres?.map((g) => (
                    <li key={g.id} className="nav-item">
                      <a
                        onClick={() => props.onSelectedGenre(g.id)}
                        className="dropdown-item"
                        href="#"
                      >
                        {g.genreName}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            <form onSubmit={handFormSubmit} className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleInputChange}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <ul className="navbar-nav me-1">
              <li className="nav-item">
                <NavLink to={"/cart"} className="nav-link">
                  <i className="fas fa-shopping-cart"></i>
                  {cart && (
                    <span className="badge bg-danger ms-1">
                      {Object.keys(cart).length}
                    </span>
                  )}
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav me-1">
              <li className="nav-item">
                <NavLink to={"/info"} className="nav-link">
                  <i className="fa-solid fa-user"></i>{" "}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
