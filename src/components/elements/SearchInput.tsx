export default function SearchInput() {
  return (
    <div className="flex w-full bg-[#E1E0E1] min-w-0 rounded-[44px] justify-between items-center">
      <input
        type="text"
        name=""
        id="search-message"
        placeholder="Поиск"
        className="border-none bg-[transparent] py-[15px]  min-w-0 flex-1 px-[10px]"
        style={{ height: "100%", minHeight: "60px" }}
      />
      <img
        src="./src/assets/glass.png"
        alt=""
        className="max-h-[30px] max-w-[30px] md:select-none mr-[10px]"
      />
    </div>
  );
}
