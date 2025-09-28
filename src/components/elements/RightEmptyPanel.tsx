export default function RightEmptyPanel() {
  return (
    <aside
      className="d-none d-lg-block"
      style={{
        position: "fixed",
        right: 0,
        top: 80,
        bottom: 0,
        width: 320,
        background: "#3f3550",
        borderTopLeftRadius: 32,
      }}
    >
      <div
        className="h-100 d-flex align-items-center justify-content-center"
        style={{ padding: 24 }}
      >
        <div
          className="text-white fw-bold text-center"
          style={{ fontSize: 48, letterSpacing: 1, lineHeight: 1.1 }}
        >
          ПОКА
          <br />
          ЗДЕСЬ
          <br />
          ПУСТО
        </div>
      </div>
    </aside>
  );
}





