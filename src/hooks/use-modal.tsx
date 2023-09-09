import { Link, Project } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "createProject"
  | "deleteProject"
  | "createLink"
  | "deleteLink"
  | "updateLink";

interface ModalData {
  project?: Project;
  link?: Link;
  apiUrl?: string;
  query?: Record<string, any>;
}

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
