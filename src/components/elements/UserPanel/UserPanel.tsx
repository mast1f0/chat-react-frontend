import "./UserPanel.css";

export default function UserPanel({ user }: { user?: string }) {
  return (
    <div className="panel">
      <h2 className="text-4xl py-4">{user ? user : "Ты как сюда попал?"}</h2>
    </div>
  );
}
