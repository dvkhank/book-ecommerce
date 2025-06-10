import ListBook from "../../product/ListBook";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";

interface HomePageInterface {
  searchKeyword: string;
}
const HomePage: React.FC<HomePageInterface> = (props) => {
  return (
    <div>
      <Banner />
      <Carousel />
      <ListBook searchKeyWord={props.searchKeyword} />
    </div>
  );
};

export default HomePage;
