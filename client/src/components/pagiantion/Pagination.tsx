import usePagination from "../../hooks/usePagination";

const Pagination = () => {
  const pagination = usePagination({
    total: 23,
    curentPage: 4,
    limit: 2,
    sibling: 0,
  });
  console.log("🚀 ~ Pagination ~ pagination:", pagination);
  return <div className="flex justify-center items-center">Pagination</div>;
};

export default Pagination;
