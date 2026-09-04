"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Unit = "m" | "ft";

const UnitsContext = createContext<{
  unit: Unit;
  setUnit: (unit: Unit) => void;
}>({
  unit: "m",
  setUnit: () => {},
});

export function UnitsProvider({ children }: { children: ReactNode }) {
  const [unit, setUnitState] = useState<Unit>("m");

  useEffect(() => {
    const saved = window.localStorage.getItem("peak-unit");
    if (saved === "ft" || saved === "m") setUnitState(saved);
  }, []);

  function setUnit(next: Unit) {
    setUnitState(next);
    window.localStorage.setItem("peak-unit", next);
  }

  return (
    <UnitsContext.Provider value={{ unit, setUnit }}>
      {children}
    </UnitsContext.Provider>
  );
}

export function useUnits() {
  return useContext(UnitsContext);
}

export function Elevation({ m }: { m: number }) {
  const { unit } = useUnits();
  if (unit === "ft") {
    return <>{Math.round(m * 3.280839895).toLocaleString()} ft</>;
  }
  return <>{m.toLocaleString()} m</>;
}

export function UnitToggle() {
  const { unit, setUnit } = useUnits();
  return (
    <span className="inline-flex text-xs text-stone-500">
      <button
        type="button"
        className={unit === "m" ? "text-stone-900" : "hover:text-stone-800"}
        onClick={() => setUnit("m")}
      >
        m
      </button>
      <span className="px-1 text-stone-300">/</span>
      <button
        type="button"
        className={unit === "ft" ? "text-stone-900" : "hover:text-stone-800"}
        onClick={() => setUnit("ft")}
      >
        ft
      </button>
    </span>
  );
}