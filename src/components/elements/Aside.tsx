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
        <div className="flex justify-center items-center h-[100%]">
          <h1 className="text-[#fff] font-black text-5xl text-center select-none">
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
          className="text-white rounded-[12px] p-2.5 flex items-center gap-2.5"
        >
          <div style={{ flex: 1 }}>
            <strong className="text-[2rem] font-light">{msg.name}</strong>
          </div>
        </div>
      ))}
      <div onMouseDown={startResizing} style={resizerStyle} />
    </aside>
  );
}
