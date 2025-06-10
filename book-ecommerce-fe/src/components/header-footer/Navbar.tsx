import { useEffect, useState } from "react";
import api from "../../api/api";

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

  return (
    <div>
      <nav
        style={{ backgroundColor: "#f5f5dc" }}
        className="navbar navbar-expand-lg"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Book Ecommerce
          </a>
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
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
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
                <a className="nav-link">
                  <i className="fas fa-shopping-cart"></i>{" "}
                </a>
              </li>
            </ul>
            <ul className="navbar-nav me-1">
              <li className="nav-item">
                <a className="nav-link">
                  <i className="fa-solid fa-user"></i>{" "}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
