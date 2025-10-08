import React from "react";
import Image from "next/image";

interface Props {
  name: string;
  width: number;
  height: number;
  needsTheme?: boolean;
  className?: string;
}

const Icon = ({ name, width, height, needsTheme = true, className }: Props) => {
  if (!needsTheme)
    return (
      <Image
        src={`ui-icons/${name}.svg`}
        alt={name + "_icon"}
        className={className}
        width={width}
        height={height}
      />
    );

  return (
    <>
      <Image
        src={`ui-icons/${name}-light.svg`}
        alt={name + "_light"}
        className={`block dark:hidden ${className}`}
        width={width}
        height={height}
      />
      <Image
        src={`ui-icons/${name}-dark.svg`}
        alt={name + "_dark"}
        className={`hidden dark:block ${className}`}
        width={width}
        height={height}
      />
    </>
  );
};

export default Icon;
