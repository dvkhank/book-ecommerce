import "./App.css";
import Navbar from "./components/header-footer/Navbar";
import Footer from "./components/header-footer/Footer";
import HomePage from "./components/homepage/HomePage";
import { useState } from "react";

function App() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };
  return (
    <div className="App container">
      <Navbar onSearch={handleSearch} />
      <HomePage searchKeyword={searchKeyword} />
      <Footer />
    </div>
  );
}

export default App;
