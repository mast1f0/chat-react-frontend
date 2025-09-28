type Chat = {
  avatar: string;
  name: string;
  subtitle: string;
  time?: string;
  active?: boolean;
};

export default function UserMessage({
  avatar,
  name,
  subtitle,
  time,
  active,
}: Chat) {
  return (
    <div
      className={`d-flex align-items-center p-2 ${
        active ? "bg-white rounded-4 mt-2" : ""
      }`}
    >
      <img
        src={avatar}
        alt=""
        className="rounded-circle me-2"
        style={{ width: 44, height: 44, objectFit: "cover" }}
      />
      <div className="flex-grow-1">
        <div className="d-flex align-items-center">
          <span className={`fw-semibold ${active ? "" : "text-white"}`}>
            {name}
          </span>
          {time && (
            <span
              className={`ms-auto small ${
                active ? "text-muted" : "text-white-50"
              }`}
            >
              {time}
            </span>
          )}
        </div>
        <div className={`small ${active ? "text-muted" : "text-white-50"}`}>
          {subtitle}
        </div>
      </div>
    </div>
  );
}
