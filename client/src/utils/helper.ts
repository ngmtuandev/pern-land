export const XHelper = {
  renderRangeNumber: function (start: number, end: number) {
    const length = end - start + 1;
    return Array.from({ length }, (_, index) => start + index);
  },
  slugify: function (str: string) {
    str = str.replace(/^\s+|\s+$/g, "");
    str = str.toLowerCase();
    str = str
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    return str;
  },
};
