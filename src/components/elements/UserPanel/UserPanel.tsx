import "./UserPanel.css";

export default function UserPanel({ user }: { user?: string }) {
  return (
    <div className="panel">
      <h2 className="text-4xl py-4">{user}</h2>
    </div>
  );
}
