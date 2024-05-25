const SearchItem = ({ title, children }: { title: string; children: any }) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <h3 className="font-semibold text-yellow-bold-main">{title}</h3>
      {children}
    </div>
  );
};

export default SearchItem;
