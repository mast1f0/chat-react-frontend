import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

interface ChatsRefreshContextType {
  refreshChats: () => void;
  registerRefreshCallback: (callback: () => void) => void;
}

const ChatsRefreshContext = createContext<ChatsRefreshContextType | undefined>(
  undefined
);

export const useChatsRefresh = () => {
  const context = useContext(ChatsRefreshContext);
  if (!context) {
    throw new Error("useChatsRefresh must be used within a ChatsRefreshProvider");
  }
  return context;
};

interface ChatsRefreshProviderProps {
  children: ReactNode;
}

export const ChatsRefreshProvider = ({ children }: ChatsRefreshProviderProps) => {
  const [refreshCallback, setRefreshCallback] = useState<(() => void) | null>(null);

  const registerRefreshCallback = useCallback((callback: () => void) => {
    setRefreshCallback(() => callback);
  }, []);

  const refreshChats = useCallback(() => {
    if (refreshCallback) {
      refreshCallback();
    }
  }, [refreshCallback]);

  return (
    <ChatsRefreshContext.Provider value={{ refreshChats, registerRefreshCallback }}>
      {children}
    </ChatsRefreshContext.Provider>
  );
};
