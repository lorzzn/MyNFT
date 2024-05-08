import classNames from "classnames";
import { twMerge } from "tailwind-merge";

export const twclx = (...args: classNames.ArgumentArray) =>
  twMerge(classNames(...args));
