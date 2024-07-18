import { useEffect } from "react";

export function useWindowEvent(type: keyof WindowEventMap, event: (e?: any) => void) {
  useEffect(() => {
    window.addEventListener(type, event);
    return () => window.removeEventListener(type, event);
  }, []);
} 