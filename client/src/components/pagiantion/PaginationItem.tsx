import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import withRouter from "../../hocs/withRouter";
import { createSearchParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
const PaginationItem = ({ content, pageCurrent, navigate, location }: any) => {
  const [searchParams] = useSearchParams();

  const handleChangePage = () => {
    const paramsSearch: any = Object.fromEntries([...searchParams]);
    if (content) {
      paramsSearch.page = content;
    }
    if (searchParams?.getAll("price")) {
      paramsSearch.price = searchParams?.getAll("price");
    }
    navigate({
      pathname: location.pathname, // properties
      search: createSearchParams(paramsSearch).toString(), // properties?pages=12
    });
  };

  if (!Number(content))
    return (
      <div
        className="w-8 h-8 rounded-md px-1 bg-gray-600 text-white 
  flex items-center justify-center"
      >
        {content}
      </div>
    );
  return (
    <div
      onClick={() => handleChangePage()}
      className={twMerge(
        clsx(
          "w-8 h-8 rounded-md px-1 cursor-pointer bg-gray-600 text-white font-semibold flex items-center justify-center",
          !pageCurrent && +content === 1 && "bg-yellow-bold-main text-white",
          +pageCurrent &&
            +content === +pageCurrent &&
            "bg-yellow-bold-main text-white"
        )
      )}
    >
      {content}
    </div>
  );
};

export default withRouter(PaginationItem);
