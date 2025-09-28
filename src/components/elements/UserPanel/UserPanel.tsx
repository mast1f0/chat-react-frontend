import "./UserPanel.css";

interface UserInfo {
  name: string;
  status: string;
  image: string;
}

export default function UserPanel({ user }: { user?: UserInfo }) {
  if (!user) {
    return (
      <div className="panel" style={{ color: "transparent" }}>
        Молодец, нашел!
      </div>
    );
  }

  return (
    <div className="panel">
      <h2 className="panel__name">{user.name}</h2>
      <p className="panel__status">{user.status}</p>
      <img src={user.image} className="avatar" alt="" />
    </div>
  );
}
