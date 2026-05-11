import React, { useRef, useState, useEffect, type ReactNode, type Dispatch, type SetStateAction } from "react";
import { motion } from "framer-motion";

type Position = { left: number; width: number; opacity: number };

export type SlideTab = {
  label: string;
  onClick?: () => void;
};

export const SlideTabs: React.FC<{
  tabs: SlideTab[];
  selectedIndex?: number;
  onSelect?: (i: number) => void;
  className?: string;
}> = ({ tabs, selectedIndex, onSelect, className = "" }) => {
  const [position, setPosition] = useState<Position>({ left: 0, width: 0, opacity: 0 });
  const [internalSelected, setInternalSelected] = useState(0);
  const selected = selectedIndex ?? internalSelected;
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const el = tabsRef.current[selected];
    if (el) {
      setPosition({ left: el.offsetLeft, width: el.getBoundingClientRect().width, opacity: 1 });
    }
  }, [selected]);

  const resetToSelected = () => {
    const el = tabsRef.current[selected];
    if (el) {
      setPosition({ left: el.offsetLeft, width: el.getBoundingClientRect().width, opacity: 1 });
    }
  };

  return (
    <ul
      onMouseLeave={resetToSelected}
      className={`relative mx-auto flex w-fit rounded-full border border-cream/25 bg-[color:var(--navy)]/60 p-1 backdrop-blur ${className}`}
    >
      {tabs.map((tab, i) => (
        <Tab
          key={tab.label}
          ref={(el) => {
            tabsRef.current[i] = el;
          }}
          setPosition={setPosition}
          onClick={() => {
            if (selectedIndex === undefined) setInternalSelected(i);
            onSelect?.(i);
            tab.onClick?.();
          }}
        >
          {tab.label}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  );
};

const Tab = React.forwardRef<
  HTMLLIElement,
  {
    children: ReactNode;
    setPosition: Dispatch<SetStateAction<Position>>;
    onClick: () => void;
  }
>(({ children, setPosition, onClick }, ref) => {
  return (
    <li
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => {
        if (!ref || typeof ref === "function" || !ref.current) return;
        const el = ref.current;
        setPosition({ left: el.offsetLeft, width: el.getBoundingClientRect().width, opacity: 1 });
      }}
      className="relative z-10 block cursor-pointer px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-cream mix-blend-difference md:px-6 md:py-2.5"
    >
      {children}
    </li>
  );
});
Tab.displayName = "SlideTab";

const Cursor: React.FC<{ position: Position }> = ({ position }) => {
  return (
    <motion.li
      animate={{ left: position.left, width: position.width, opacity: position.opacity }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      className="absolute z-0 h-8 rounded-full bg-cream md:h-9"
    />
  );
};
