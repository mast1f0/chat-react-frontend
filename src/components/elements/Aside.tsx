import { useState, useEffect, useRef, useCallback } from "react";
import React from "react";

export interface Message {
  id: string;
  name: string;
  owner_id: string;
}

interface AsideProps {
  messages?: Message[];
}

export default function Aside({ messages = [] }: AsideProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState<number>(
    () => Number(localStorage.getItem("asideWidth")) || 268
  );

  const startResizing = useCallback(() => setIsResizing(true), []);
  const stopResizing = useCallback(() => setIsResizing(false), []);
  const resize = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !sidebarRef.current) return;
      const right = sidebarRef.current.getBoundingClientRect().right;
      const newWidth = right - e.clientX;
      if (newWidth > 180 && newWidth < 1000) setWidth(newWidth);
    },
    [isResizing]
  );

  useEffect(() => {
    localStorage.setItem("asideWidth", String(width));
  }, [width]);

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  const baseStyle: React.CSSProperties = {
    backgroundColor: "#403752",
    width,
    height: "100vh",
    float: "right",
    borderTopLeftRadius: 33,
    position: "relative",
  };

  const resizerStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    width: 8,
    height: "100%",
    cursor: "ew-resize",
  };

  if (messages.length === 0)
    return (
      <div ref={sidebarRef} style={baseStyle}>
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
              color: "#fff",
              fontSize: 48,
              fontWeight: 900,
              textAlign: "center",
              userSelect: "none",
            }}
          >
            ПОКА ЗДЕСЬ ПУСТО
          </h1>
        </div>
        <div onMouseDown={startResizing} style={resizerStyle} />
      </div>
    );

  return (
    <aside
      ref={sidebarRef}
      style={{
        ...baseStyle,
        display: "flex",
        flexDirection: "column",
        padding: 10,
        overflowY: "auto",
        gap: 10,
        userSelect: isResizing ? "none" : "auto",
      }}
    >
      {messages.map((msg) => (
        <div
          key={msg.id}
          style={{
            color: "#fff",
            borderRadius: 12,
            padding: 10,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ flex: 1 }}>
            <strong style={{ fontSize: "2rem", fontWeight: 300 }}>
              {msg.name}
            </strong>
          </div>
        </div>
      ))}
      <div onMouseDown={startResizing} style={resizerStyle} />
    </aside>
  );
}
