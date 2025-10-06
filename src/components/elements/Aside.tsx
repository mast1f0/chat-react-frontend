import React, { useState, useEffect, useRef } from "react";

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
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(268);

  const startResizing = React.useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing && sidebarRef.current) {
        const sidebarRight = sidebarRef.current.getBoundingClientRect().right;
        const newWidth = sidebarRight - mouseMoveEvent.clientX;
        if (newWidth > 180 && newWidth < 1000) {
          setSidebarWidth(newWidth);
        }
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  // если нет сообщений
  if (messages.length === 0) {
    return (
      <div
        ref={sidebarRef}
        style={{
          width: sidebarWidth,
          backgroundColor: "#403752",
          height: "100vh",
          float: "right",
          borderTopLeftRadius: "33px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "48px",
              fontWeight: "900",
              textAlign: "center",
              paddingInline: 20,
              userSelect: "none",
            }}
          >
            ПОКА ЗДЕСЬ ПУСТО
          </h1>
        </div>
        <div
          onMouseDown={startResizing}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "10px",
            height: "100%",
            cursor: "ew-resize",
          }}
        />
      </div>
    );
  }

  return (
    <aside
      ref={sidebarRef}
      style={{
        backgroundColor: "#403752",
        width: sidebarWidth,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        height: "100vh",
        float: "right",
        borderTopLeftRadius: "33px",
        padding: "10px",
        overflowY: "auto",
        gap: 10,
        position: "relative",
        userSelect: isResizing ? "none" : "auto",
      }}
      onMouseDown={(e) => e.preventDefault()}
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            color: "#ffffff",
            borderRadius: "12px",
            padding: "10px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
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
                  wordBreak: "break-word",
                }}
              >
                {/* {msg.lastMsg?.length === 0 ? "Тишина" : msg.lastMsg} */}
              </p>
              <p
                style={{
                  marginLeft: 10,
                  fontSize: "1rem",
                  color: "#BCBCBC",
                  fontStyle: "italic",
                }}
              >
                {/* {msg.status} */}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div
        onMouseDown={startResizing}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "5px",
          height: "100%",
          cursor: "ew-resize",
          color: "transparent",
        }}
      />
    </aside>
  );
}
