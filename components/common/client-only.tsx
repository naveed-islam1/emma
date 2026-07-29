"use client";
import { Loader } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function ClientOnly({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader className="animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
