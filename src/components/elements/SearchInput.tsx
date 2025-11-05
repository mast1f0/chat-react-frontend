import glassIcon from "../../assets/glass.png";

interface SearchInputProps {
  query?: string;
  setQuery: (value: string) => void;
}

export default function SearchInput({ query, setQuery }: SearchInputProps) {
  return (
    <div className="flex h-full w-full bg-[#E1E0E1] min-w-0 rounded-[44px] justify-between items-center">
      <input
        type="text"
        name=""
        id="search-message"
        placeholder="Поиск"
        className="border-none bg-[transparent] py-[15px] min-w-0 w-full flex-1 px-[10px] max-w-full box-border"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ height: "100%", minHeight: "60px", fontSize: "16px" }}
      />
      <img
        src={glassIcon}
        alt=""
        className="max-h-[30px] max-w-[30px] md:select-none mr-[10px]"
      />
    </div>
  );
}
