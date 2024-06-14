const SearchItem = ({ title, children }: { title?: string; children: any }) => {
  return (
    <div className="flex relative w-[500px] h-14 flex-col gap-1 md:gap-2 justify-center items-center">
      <h3 className="font-semibold text-gray-700 uppercase md:text-yellow-bold-main md:h-6 h-5">{title && title}</h3>
      <div className="h-10 mt-2 w-full flex items-center justify-center" >{children}</div>
    </div>
  );
};

export default SearchItem;
