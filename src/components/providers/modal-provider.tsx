"use client";

import { useEffect, useState } from "react";
import { CreateProjectModal } from "../modals/create-project-modal";
import { CreateLinkModal } from "../modals/create-link-modal";
import { UpdateLinkModal } from "../modals/update-link-modal";
import { DeleteLinkModal } from "../modals/delete-link-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateProjectModal />
      <CreateLinkModal />
      <UpdateLinkModal />
      <DeleteLinkModal />
    </>
  );
};
