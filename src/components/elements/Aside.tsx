interface Message {
  name: string;
  status: string;
  image: string;
}

interface AsideProps {
  messages?: Message[];
}

export default function Aside({ messages = [] }: AsideProps) {
  if (messages.length === 0) {
    return (
      <aside
        style={{
          flex: 1,
          maxWidth: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          height: "100%",
          marginTop: "20px",
          float: "right",
          borderTopLeftRadius: "33px",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "48px",
            fontWeight: "900",
            textAlign: "center",
            letterSpacing: "0",
            paddingInline: 20,
          }}
        >
          ПОКА ЗДЕСЬ ПУСТО
        </h1>
      </aside>
    );
  }

  return (
    <aside
      style={{
        backgroundColor: "#403752",
        flex: 1,
        maxWidth: "320px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "left",
        height: "100vh",
        float: "right",
        borderTopLeftRadius: "33px",
        padding: "10px",
        overflowY: "auto",
      }}
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            color: "#ffffff",
            borderRadius: "12px",
            padding: "10px",
            marginBottom: "10px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyItems: "left",
          }}
        >
          <img
            src={msg.image}
            alt={msg.name}
            style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          />
          <div>
            <strong style={{ fontSize: "32px", fontWeight: "300" }}>
              {msg.name}
            </strong>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                color: "#BCBCBC",
                fontStyle: "italic",
              }}
            >
              {msg.status}
            </p>
          </div>
        </div>
      ))}
    </aside>
  );
}
