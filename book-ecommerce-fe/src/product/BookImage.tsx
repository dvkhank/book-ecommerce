import React, { useEffect, useState } from "react";
import ImageModel from "../models/ImageModel";
import { Carousel } from "react-responsive-carousel";
import api from "../api/api";
interface BookImageInterface {
  bookId: number | undefined;
}
const BookImage: React.FC<BookImageInterface> = (props) => {
  const bookId: number | undefined = props.bookId;
  const [loading, setLoading] = useState(true);
  const [listImage, setListImage] = useState<ImageModel[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageModel | null>();

  const selectImage = (img: ImageModel) => {
    setSelectedImage(img);
  };

  useEffect(() => {
    api
      .get(`/books/${props.bookId}/listImages`)
      .then((res) => {
        setListImage(res.data._embedded.images);
        if (listImage.length > 0) {
          setSelectedImage(listImage[0]);
        }
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [props.bookId]);

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 text-center">
        <img
          style={{
            maxWidth: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
          src={selectedImage?.link}
          alt="haha"
        />
      </div>
      <div>
        <div className="row">
          {listImage.map((image, index) => (
            <div
              className="col-3"
              key={index}
              onClick={() => {
                selectImage(image);
              }}
            >
              <img
                src={image.link}
                style={{
                  maxWidth: "100%",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookImage;
