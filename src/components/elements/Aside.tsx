// src/components/Sidebar/Sidebar.tsx

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
          backgroundColor: "#403752",
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
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: "auto",
        height: "100%",
        marginTop: "20px",
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
            paddingInline: "50px",
            marginBottom: "10px",
            width: "90%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyItems: "center",
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
