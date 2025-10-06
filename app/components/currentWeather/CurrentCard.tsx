import React from "react";
import Image from "next/image";

interface Props {
  value: string | number;
  desc: string;
  image: string;
}

// A component where current weather details are displayed
const CurrentCard = ({ value, desc, image }: Props) => {
  return (
    <div className="current_card">
      <Image src={image} alt={desc} width={50} height={50} />
      <div className="flex flex-col items-end gap-1">
        <span className="text-neutral-600 dark:text-white">{value}</span>
        <p className="text-neutral-800 dark:text-neutral-300">{desc}</p>
      </div>
    </div>
  );
};
export default CurrentCard;
