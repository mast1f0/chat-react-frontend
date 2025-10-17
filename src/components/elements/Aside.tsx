import { useState, useEffect, useRef, useCallback } from "react";
import React from "react";
import SearchInput from "./SearchInput";
import AddFriendButton from "../buttons/AddFriend";

export interface Message {
  id: string;
  name: string;
  owner_id: string;
}

interface AsideProps {
  messages?: Message[];
  onToggleMenu: () => void;
}


export default function Aside({ messages = [], onToggleMenu }: AsideProps) {
  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState<number>(
    () => Number(localStorage.getItem("asideWidth")) || 413
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
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

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
      <div className={`md:h-full flex-col flex md:flex-none`}>
        <div className={`md:pr-0 md:flex md:ml-auto md:items-center md:gap-[1px] md:mt-[10px] md:mb-[20px] hidden`}
          style={{ width: width }}>
          <SearchInput />
          <AddFriendButton onToggleMenu={onToggleMenu} />
        </div>
        <div ref={sidebarRef} className="bg-[#403752] h-full md:ml-auto rounded-tl-[33px] md:rounded-tr-[0px] relative rounded-t-10px" style={{ width: screenSize.width <= 768 ? "100%" : `${width}px` }}>
          <div className="flex justify-center items-center h-[100%]">
            <h1 className="text-[#fff] font-black text-5xl text-center select-none">
              ПОКА ЗДЕСЬ ПУСТО
            </h1>
          </div>
          <div onMouseDown={startResizing} style={resizerStyle} />
        </div>
      </div>
    );

  return (
    <aside
      ref={sidebarRef}
      className={`bg-[#403752] h-full ml-auto rounded-tl-[33px] relative flex flex-col p-2.5 overflow-y-auto gap-2.5 ${isResizing ? 'select-none' : 'select-auto'
        }`}
      style={{ width }}
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
