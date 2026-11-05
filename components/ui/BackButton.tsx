"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/home");
  };

  return (
    <button
      onClick={goBack}
      className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium backdrop-blur transition-colors hover:bg-background"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </button>
  );
}
