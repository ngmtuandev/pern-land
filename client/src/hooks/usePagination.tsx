import { useMemo } from "react";
import { XHelper } from "../utils/helper";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const usePagination = ({total = 0, curentPage = 1, limit = 1, sibling = 0}) => {
  const paginationArray = useMemo(() => {
    const pageSize = +limit;
    const pageNumber = Math.ceil(total / pageSize); // total page all
    const totalPaginationItem = 5 + sibling * 2; // total item of page display 1,2...3,4 -> 4
    if (pageNumber < totalPaginationItem) {
      return XHelper.renderRangeNumber(1, pageNumber);
    }
    const isShowDotInLeft = curentPage - sibling > 3;
    const isShowDotInRight = curentPage + sibling < pageNumber - 2;
    if (isShowDotInLeft && !isShowDotInRight) {
      const rightStart = pageNumber - 2 - sibling * 2;
      const rightArray = XHelper.renderRangeNumber(rightStart, pageNumber);
      return [1, <BiDotsHorizontalRounded />, ...rightArray];
    }
    if (!isShowDotInLeft && isShowDotInRight) {
      const leftArray = XHelper.renderRangeNumber(1, 3 + sibling * 2);
      return [...leftArray, <BiDotsHorizontalRounded />, pageNumber];
    }
    // sibling : 123 ... 456... 34
    const siblingLeft = Math.max(1, curentPage - sibling);
    const siblingRight = Math.min(pageNumber, curentPage + sibling);

    if (isShowDotInLeft && isShowDotInRight) {
      const middleArray = XHelper.renderRangeNumber(siblingLeft, siblingRight);
      return [
        1,
        <BiDotsHorizontalRounded />,
        ...middleArray,
        <BiDotsHorizontalRounded />,
        pageNumber,
      ];
    }
  }, [total, limit, curentPage, sibling]);

  return paginationArray;
};

export default usePagination;
