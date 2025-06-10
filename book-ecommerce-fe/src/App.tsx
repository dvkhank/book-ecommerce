import "./App.css";
import Navbar from "./components/header-footer/Navbar";
import Footer from "./components/header-footer/Footer";
import HomePage from "./components/homepage/HomePage";
import { useState } from "react";

function App() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };
  return (
    <div className="App container">
      <Navbar onSelectedGenre={setSelectedGenreId} onSearch={handleSearch} />
      <HomePage
        selectedGenreId={selectedGenreId}
        searchKeyword={searchKeyword}
      />
      <Footer />
    </div>
  );
}

export default App;
