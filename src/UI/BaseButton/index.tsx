import React, { PropsWithChildren, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Location } from "history";
import BasePreloader from "../BasePreloader";
import "./style.scss";

interface Props {
  to?: Location;
  secondary?: boolean;
  transparent?: boolean;
  negative?: boolean;
  positive?: boolean;
  loading?: boolean;
  disabled?: boolean;
  fullWith?: boolean;
  icon?: boolean;
  className?: string;
  type?: "submit" | "button";
  onClick?: (evt: MouseEvent) => void;
}

export default function BaseButton({
  to,
  onClick,
  children,
  secondary,
  negative,
  positive,
  loading,
  disabled,
  className,
  fullWith,
  icon,
  type = "button",
}: PropsWithChildren<Props>) {
  const cls = ["base-button"];
  if (className) cls.push(className);
  if (secondary) cls.push("__secondary");
  if (icon) cls.push("__icon");
  if (negative) cls.push("base-button__negative");
  if (positive) cls.push("base-button__positive");
  if (fullWith) cls.push("__full-width");
  if (loading) cls.push("__loading");


  if (to) {
    return (
      <Link className={cls.join(" ")} to={to}>
        {children}
      </Link>
    );
  }

  const preloaderColor = secondary ? "var(--palette-bg)" : "";

  const handleButtonClick = (evt: React.MouseEvent) => {
    if (onClick && !loading && !disabled) {
      onClick(evt);
    }
  };

  return (
    <button className={cls.join(" ")} type={type} disabled={disabled || loading} onClick={handleButtonClick}>
      {loading && <BasePreloader size={24} color={preloaderColor} />}
      {!loading && children}
    </button>
  );
}
