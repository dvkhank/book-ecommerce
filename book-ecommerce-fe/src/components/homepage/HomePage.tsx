import ListBook from "../../product/ListBook";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <Carousel />
      <ListBook />
    </div>
  );
};

export default HomePage;
