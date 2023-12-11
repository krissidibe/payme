import React from "react";
import { create } from "zustand";

interface useGlobalProp {
  isOpen: boolean;
  title: string;
  message?: string;
  name?: string;
  onOpen: () => void;
  setMessage: (i) => void;
  setTitle: (i) => void;
  onClose: () => void;
  onSubmit: any;
}

export const useGlobalPayment = create<useGlobalProp>((set) => ({
  isOpen: false,
  title: "",
  message: "", 
  onOpen: () => set({ isOpen: true }),
  setMessage: (i) => set((state) => ({ message:i })),
  setTitle: (i) => set((state) => ({ title:i })),
  onClose: () => set({ isOpen: false }),
  onSubmit: <React.Component/>,
}));


 /* 
  const useMenuStore = create((set) => ({
  index: -1,
  setMenuIndex: (i) => set((state) => ({ index:i })),
  removeAllindex: () => set({ index: 0 }),
}))

 
 */