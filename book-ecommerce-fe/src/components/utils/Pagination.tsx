/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
interface PaginationInterface {
  current: number;
  total: number;
  pagination: any;
}

const Pagination: React.FC<PaginationInterface> = (props) => {
  const listPages = [];

  if (props.current === 1) {
    listPages.push(props.current);
    //Dont know that we have page 2, 3 ?
    if (props.total >= props.current + 1) {
      listPages.push(props.current + 1);
    }
    if (props.total >= props.current + 2) {
      listPages.push(props.current + 2);
    }
  } else if (props.current > 1) {
    //Case when current is not 1
    //When current is 3 => we have 3, 2 ,1

    if (props.current >= 3) {
      listPages.push(props.current - 2); //First papge before current
    }
    //When current is 2 => we have 2, 1
    if (props.current >= 2) {
      listPages.push(props.current - 1); //Second page before current
    }
    //Dont know that we have page 2 more pages ?
    listPages.push(props.current);
    if (props.total >= props.current + 1) {
      listPages.push(props.current + 1);
    }
    if (props.total >= props.current + 2) {
      listPages.push(props.current + 2);
    }
  }
  return (
    <div className="d-flex justify-content-center mt-4">
      <nav aria-label="...">
        <ul className="pagination">
          <li className="page-item">
            <button onClick={() => props.pagination(1)} className="page-link">
              First
            </button>
          </li>
          {listPages.map((page) => (
            <li key={page} className="page-item">
              <button
                onClick={() => props.pagination(page)}
                className={
                  "page-link " + (props.current === page ? "active" : "")
                }
              >
                {page}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              onClick={() => props.pagination(props.total)}
              className="page-link"
            >
              Last
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
