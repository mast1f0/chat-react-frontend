import addFriend from "/src/assets/meet-friend.png";

export default function AddFriendButton() {
  return (
    <div
      style={{
        display: "flex",
        borderRadius: "50%",
        backgroundColor: "#E1E0E1",
        height: 64,
        width: 64,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <a
        href="/add"
        aria-label="Добавить друга"
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          textDecoration: "none",
          backgroundColor: "#E1E0E1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={addFriend}
          alt="Настройки"
          style={{ maxWidth: 51, maxHeight: 51, padding: 4 }}
        />
      </a>
    </div>
  );
}
