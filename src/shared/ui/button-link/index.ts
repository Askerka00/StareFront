import { buttonStyles } from "@/shared/ui/button";

import styles from "./styles.module.css";

interface Props {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  variant?:
    | "ghost"
    | "primary"
    | "secondary-gray"
    | "secondary-color"
    | "link-gray"
    | "link-color"
    | "tertiary-gray";
}

export const getClassList = ({ size = "lg", variant = "primary" }: Props) => [
  buttonStyles.root,
  buttonStyles[`size-${size}`],
  variant !== "ghost" && buttonStyles[`variant-${variant}`],
  styles.root,
];
