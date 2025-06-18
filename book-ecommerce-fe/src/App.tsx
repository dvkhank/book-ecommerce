import "./App.css";
import Navbar from "./components/header-footer/Navbar";
import Footer from "./components/header-footer/Footer";
import HomePage from "./components/homepage/HomePage";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookDetails from "./product/BookDetails";
import Register from "./user/Register";
import ActiveAccount from "./user/ActiveAccount";
import Login from "./user/Login";
import BookForm from "./admin/BookForm";
import BookForm_Admin from "./admin/BookForm";
import RequireAuth from "./components/utils/RequireAuth";

function App() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };
  return (
    <div className="App container">
      <BrowserRouter>
        <Navbar onSelectedGenre={setSelectedGenreId} onSearch={handleSearch} />
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <HomePage
                  selectedGenreId={selectedGenreId}
                  searchKeyword={searchKeyword}
                />
              </RequireAuth>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/books/:bookId"
            element={
              <RequireAuth>
                <BookDetails />
              </RequireAuth>
            }
          />
          <Route path="/user/active" element={<ActiveAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/book" element={<BookForm_Admin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
