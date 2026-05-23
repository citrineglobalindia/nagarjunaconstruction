import { useEffect, useState } from "react";

export function useIsRTL() {
  // Always start as false to keep SSR and client first render in sync;
  // the real value is set in useEffect after hydration.
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const update = () => setIsRTL(root.dir === "rtl");
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["dir"] });
    return () => observer.disconnect();
  }, []);

  return isRTL;
}
