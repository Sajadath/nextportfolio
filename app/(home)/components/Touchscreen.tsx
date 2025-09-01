"use client";
import { useEffect } from "react";

interface InputDetectionProps {
  inputType: string;
  setInputType: (type: string) => void;
}

const InputDetection = ({ inputType, setInputType }: InputDetectionProps) => {
  const detectInputType = () => {
    if (typeof window !== "undefined") {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const hasMouse = window.matchMedia("(pointer: fine)").matches;

      if (hasTouch && !hasMouse) {
        return "phone";
      } else {
        return "mouse";
      }
    }
    return "mouse"; // Fallback for SSR
  };

  useEffect(() => {
    const updateInputType = () => {
      const newInputType = detectInputType();
      if (newInputType !== inputType) {
        setInputType(newInputType);
      }
    };

    updateInputType();

    window.addEventListener("mousemove", updateInputType);
    window.addEventListener("touchstart", updateInputType);

    return () => {
      window.removeEventListener("mousemove", updateInputType);
      window.removeEventListener("touchstart", updateInputType);
    };
  }, [inputType, setInputType]);

  return null;
};

export default InputDetection;
