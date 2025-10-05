export interface Message {
  id: string;
  name: string;
  owner_id: string;
  // status: string;
  // image: string;
  // lastMsg: string;
}

interface AsideProps {
  messages?: Message[];
}

export default function Aside({ messages = [] }: AsideProps) {
  if (messages.length === 0) {
    return (
      // <aside className="flex flex-1 max-w-[300px] justify-center items-center m-auto h-full mt-5 float-right rounded-tl-[33px]">

      <aside
        style={{
          flex: 1,
          maxWidth: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          height: "100vh",
          marginTop: "20px",
          float: "right",
          borderTopLeftRadius: "33px",
          backgroundColor: "#403752",
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
        gap: 10,
      }}
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            color: "#ffffff",
            borderRadius: "12px",
            padding: "10px",
            // marginBottom: "10px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyItems: "left",
            paddingInline: "10px",
          }}
        >
          {/* <img
            src={msg.image}
            alt={msg.name}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              marginRight: "8%",
            }}
          /> */}
          <div style={{ display: "block", flex: 1 }}>
            <strong style={{ fontSize: "2.5rem", fontWeight: "300" }}>
              {msg.name}
            </strong>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flex: 1,
                alignItems: "center",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "1rem",
                  color: "#BCBCBC",
                  fontStyle: "italic",
                  float: "left",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  textOverflow: "ellipsis",
                  maxHeight: "10",
                }}
              >
                {/* {msg.lastMsg.length === 0 ? "Тишина" : msg.lastMsg} */}
              </p>
              <p
                style={{
                  marginLeft: 10,
                  fontSize: "1rem",
                  color: "#BCBCBC",
                  fontStyle: "italic",
                  justifySelf: "flex-start",
                }}
              >
                {/* {msg.status} */}
              </p>
            </div>
          </div>
        </div>
      ))}
    </aside>
  );
}
