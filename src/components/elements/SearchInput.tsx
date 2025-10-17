export default function SearchInput() {
  return (
    <div className="flex w-full bg-[#E1E0E1] min-w-0 rounded-[44px] justify-between items-center mr-2.5"
    >
      <input
        type="text"
        name=""
        id="search-message"
        placeholder="Поиск"
        className="border-none bg-[transparent] py-[15px]  min-w-0 flex-1 px-[10px]"
      />
      <img
        src="./src/assets/glass.png"
        alt=""
        className="max-h-[30px] max-w-[30px] mr-[10px]"
      />
    </div>
  );
}
