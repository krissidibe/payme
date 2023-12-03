import { create } from "zustand";

interface useProjectProp {
  isOpen: boolean;
  customerId: string;
  projectId?: string;
  name?: string;
  onOpen: () => void;
  onClose: () => void;
}

export const useNewProjectModal = create<useProjectProp>((set) => ({
  isOpen: false,
  customerId: "",
  projectId: "",
  name: "",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
