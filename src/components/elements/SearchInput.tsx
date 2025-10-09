export default function SearchInput() {
  return (
    <div className="flex bg-[#E1E0E1] rounded-[44px] justify-center items-center py-[10px]"
    >
      <input
        type="text"
        name=""
        id="search-message"
        placeholder="Поиск"
        className="border-none bg-[transparent] py-[10px] flex-1 w-[190px] px-[10px]"
      />
      <img
        src="./src/assets/glass.png"
        alt=""
        className="max-h-[30px] max-w-[30px] mr-[10px]"
      />
    </div>
  );
}
