export default function SearchInput() {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#E1E0E1",
        borderRadius: 44,
        justifyContent: "center",
        alignItems: "center",
        paddingBlock: 10,
      }}
    >
      <input
        type="text"
        name=""
        id="search-message"
        placeholder="Поиск"
        style={{
          border: "none",
          backgroundColor: "transparent",
          paddingInline: 15,
          flex: 1,
          width: 190,
          paddingBlock: 10,
        }}
      />
      <img
        src="./src/assets/glass.png"
        alt=""
        style={{ maxHeight: 30, maxWidth: 30, marginRight: 10 }}
      />
    </div>
  );
}
