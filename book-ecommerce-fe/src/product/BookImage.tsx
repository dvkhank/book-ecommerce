import React, { useEffect, useState } from "react";
import ImageModel from "../models/ImageModel";
import api from "../api/api";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
interface BookImageInterface {
  bookId: number | undefined;
}
const BookImage: React.FC<BookImageInterface> = (props) => {
  const bookId: number | undefined = props.bookId;
  const [loading, setLoading] = useState(true);
  const [listImage, setListImage] = useState<ImageModel[]>([]);

  useEffect(() => {
    api
      .get(`/books/${bookId}/listImages`)
      .then((res) => {
        setListImage(res.data._embedded.images);

        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [bookId]);

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="col-12">
        <Carousel showArrows={true} showIndicators={true}>
          {listImage.map((image, index) => (
            <div key={index}>
              <img src={image.link} alt="" style={{ maxWidth: "150px" }} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default BookImage;
