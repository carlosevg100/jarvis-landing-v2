"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import RegisterModal from "./RegisterModal";

const ModalContext = createContext<{ openModal: () => void }>({
  openModal: () => {},
});

export function useRegisterModal() {
  return useContext(ModalContext);
}

export default function RegisterModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ openModal: () => setOpen(true) }}>
      {children}
      <RegisterModal open={open} onClose={() => setOpen(false)} />
    </ModalContext.Provider>
  );
}
