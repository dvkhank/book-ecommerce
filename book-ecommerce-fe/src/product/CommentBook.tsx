import React, { useEffect, useState } from "react";
import CommentModel from "../models/CommentModel";
import api from "../api/api";
import dayjs from "dayjs";
import renderRating from "../components/utils/Rating";

interface CommentBookInterface {
  bookId: number;
}
const CommentBook: React.FC<CommentBookInterface> = (props) => {
  const [listComments, setListComments] = useState<CommentModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`books/${props.bookId}/listComments`).then((res) => {
      setListComments(res.data._embedded.comments);
      setLoading(false);
    });
  }, [props.bookId]);

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }
  return (
    <div className="mt-4">
      <h4 className="mb-3">Comments</h4>
      {listComments.map((comment) => (
        <div key={comment.id} className="card mb-3">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <strong>Người dùng </strong>
              <small className="text-muted">
                {dayjs(comment.created_at).format("DD/MM/YYYY")}{" "}
              </small>
            </div>
            <div className="mt-2">{comment.content}</div>
            <div className="mt-2">{renderRating(comment.rating)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentBook;
