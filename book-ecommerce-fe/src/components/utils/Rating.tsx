import { MoonStars, Star, StarFill, Stars } from "react-bootstrap-icons";

const renderRating = (rate: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rate) {
      stars.push(<StarFill className="text-warning" />);
    } else {
      stars.push(<StarFill className="text-secondary" />);
    }
  }
  return stars;
};
export default renderRating;
