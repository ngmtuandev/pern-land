import { createSearchParams, useSearchParams } from "react-router-dom";
import usePagination from "../../hooks/usePagination";
import icons from "../../utils/icons";
import Button from "../commons/Button";
import PaginationItem from "./PaginationItem";
import { EnumChangePage } from "../../utils";
import withRouter from "../../hocs/withRouter";

const Pagination = ({
  total,
  limit,
  page,
  sibling,
  navigate,
  location,
}: TPagination & { navigate: any; location: any }) => {
  const pagination = usePagination({
    total: total,
    curentPage: page,
    limit: limit,
    sibling: sibling,
  });

  const handleChangePage = (type: any) => {
    console.log("type : ", type);
    if ((type == EnumChangePage.NEXT)) {
      if (+page > 1) {
        navigate({
          pathname: location.pathname,
          search: createSearchParams({ page: String(+page + 1) }).toString(),
        });
      }
    }
    if ((type == EnumChangePage.BACK)) {
      if (+page < +total) {
        navigate({
          pathname: location.pathname,
          search: createSearchParams({ page: String(+page - 1) }).toString(),
        });
      }
    }
  };

  const { FaArrowLeft, FaArrowRight } = icons;
  const [searchParams] = useSearchParams();
  return (
    <div className="flex justify-center items-center gap-2">
      <Button handleOnClick={() => handleChangePage(EnumChangePage.BACK)}>
        <FaArrowLeft></FaArrowLeft>
      </Button>
      {pagination?.map((item, index) => (
        <PaginationItem
          pageCurrent={searchParams.get("page")}
          content={item}
          key={index}
        ></PaginationItem>
      ))}
      <Button handleOnClick={() => handleChangePage(EnumChangePage.NEXT)}>
        <FaArrowRight></FaArrowRight>
      </Button>
    </div>
  );
};

export default withRouter(Pagination);
