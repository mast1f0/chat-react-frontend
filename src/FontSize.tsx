import React, { createContext, useState, useEffect, useContext } from "react";

interface FontSizeContextProps {
  fontSize: number;
  setFontSize: (size: number) => void;
}

const FontSizeContext = createContext<FontSizeContextProps | undefined>(undefined);

export const FontSizeSetter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem("fontSize");
    return saved ? parseInt(saved) : 16;
  });

  useEffect(() => {
    document.documentElement.style.setProperty("--global-font-size", `${fontSize}px`);
    localStorage.setItem("fontSize", fontSize.toString());
  }, [fontSize]);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (!context) throw new Error("useFontSize must be used within FontSizeProvider");
  return context;
};
