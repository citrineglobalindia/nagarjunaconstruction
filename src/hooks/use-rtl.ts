import { useEffect, useState } from "react";

export function useIsRTL() {
  const [isRTL, setIsRTL] = useState(
    typeof document !== "undefined" && document.documentElement.dir === "rtl",
  );

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
