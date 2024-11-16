"use client";
import { useEffect, useRef } from "react";
import * as jdenticon from "jdenticon";

interface IdenticonProps {
  value: string;
  size: number;
  className?: string;
}

const Identicon = ({ value, size, className = "" }: IdenticonProps) => {
  const icon = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (icon.current) {
      jdenticon.update(icon.current, value);
    }
  }, [value]);

  return (
    <svg
      ref={icon}
      width={size}
      height={size}
      className={className}
      data-jdenticon-value={value}
    />
  );
};

export default Identicon;
