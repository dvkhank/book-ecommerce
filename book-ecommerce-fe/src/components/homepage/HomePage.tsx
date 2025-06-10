import ListBook from "../../product/ListBook";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";

interface HomePageInterface {
  searchKeyword: string;
  selectedGenreId: number | null;
}
const HomePage: React.FC<HomePageInterface> = (props) => {
  return (
    <div>
      <Banner />
      <Carousel />
      <ListBook
        selectedGenreId={props.selectedGenreId}
        searchKeyWord={props.searchKeyword}
      />
    </div>
  );
};

export default HomePage;
