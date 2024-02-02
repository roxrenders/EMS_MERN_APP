
import React from 'react';

const Pagination = ({ page, totalPages, handlePagination }) => {
    return (
        <div className="pagination mx-3">
            <button disabled={page === 1} onClick={() => handlePagination(page - 1)}>◀️</button>
            <span>{page} </span>
            <button disabled={page > totalPages} onClick={() => handlePagination(page + 1)}>▶️</button>
        </div>
    );
};

export default Pagination;
