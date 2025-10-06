import React from "react";
import Image from "next/image";

interface Props {
  desc: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  iconLight?: string;
  iconDark?: string;
  isDropdown?: boolean;
  smallButton?: boolean;
}

const Button = ({
  desc,
  open,
  setOpen,
  iconLight,
  iconDark,
  isDropdown,
  smallButton,
}: Props) => {
  return (
    <button
      className={smallButton ? "small_btn" : "header_btn"}
      onClick={() => setOpen(!open)}
    >
      {iconLight && iconDark && (
        <>
          <Image
            src={iconLight}
            alt={iconLight}
            className="block dark:hidden"
            width={smallButton ? 15 : 25}
            height={smallButton ? 15 : 25}
          />
          <Image
            src={iconDark}
            alt={iconDark}
            className="hidden dark:block"
            width={smallButton ? 15 : 25}
            height={smallButton ? 15 : 25}
          />
        </>
      )}
      <p className={smallButton ? "text-sm" : "text-normal hidden md:block"}>
        {desc}
      </p>
      {isDropdown && (
        <>
          <Image
            src="ui-icons/dropdown-light.svg"
            alt="dropdown-light"
            className={`${open ? "-scale-100" : "scale-100"} block duration-200 dark:hidden`}
            width={15}
            height={15}
          />
          <Image
            src="ui-icons/dropdown-dark.svg"
            alt="dropdown-dark"
            className={`${open ? "-scale-100" : "scale-100"} hidden duration-200 dark:block`}
            width={15}
            height={15}
          />
        </>
      )}
    </button>
  );
};
export default Button;
