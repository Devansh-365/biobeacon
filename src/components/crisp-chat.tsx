"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("5ca198e2-9228-4eaf-aca7-ef4a681f7c50");
  }, []);

  return null;
};
