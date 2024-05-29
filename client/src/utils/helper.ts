export const XHelper = {
  renderRangeNumber: function (start: number, end: number) {
    const length = end - start + 1;
    return Array.from({ length }, (_, index) => start + index);
  },
};
