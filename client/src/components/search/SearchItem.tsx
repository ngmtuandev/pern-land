const SearchItem = ({ title, children }: { title: string; children: any }) => {
  return (
    <div className="flex relative h-14 flex-col gap-2 justify-center items-center">
      <h3 className="font-semibold text-yellow-bold-main h-6">{title}</h3>
      <div className="h-10 mt-2 flex items-center justify-center" >{children}</div>
    </div>
  );
};

export default SearchItem;
