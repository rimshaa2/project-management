import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

export const ChartPortal = ({
  children,
  selector,
}: {
  children: React.ReactNode;
  selector: string;
}) => {
  const [target, setTarget] = useState<Element | null>(null);

  useEffect(() => {
    setTarget(document.querySelector(selector));
  }, [selector]);

  return target ? createPortal(children, target) : null;
};
