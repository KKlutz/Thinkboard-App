const Pagination = ({ currentPage, totalPages, onChangePages }) => {
  return (
    <div className="flex justify-center mb-10">
      <div className="join">
        <button
          className="join-item btn text-accent"
          disabled={currentPage <= 1}
          onClick={() => onChangePages(currentPage - 1)}
        >
          «
        </button>
        <button className="join-item btn ">Page {currentPage}</button>
        <button
          className="join-item btn text-accent"
          disabled={currentPage >= totalPages}
          onClick={() => onChangePages(currentPage + 1)}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
