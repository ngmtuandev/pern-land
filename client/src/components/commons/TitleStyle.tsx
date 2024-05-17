const TitleStyle = ({ content, children }: { content: string, children?: any }) => {
  return (
    <div className="mt-5 w-full border-b-2 flex justify-between items-center px-4">
      <h1 className="font-bold pb-3 text-2xl tracking-tight text-yellow-bold-main">{content}</h1>
      {children}
    </div>
  );
}

export default TitleStyle;