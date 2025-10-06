import React from "react";
import Image from "next/image";

interface Props {
  value: number;
  desc: string;
  image: string;
}

// A component where current air quality details are displayed
const AirQualityLabels = ({ value, desc, image }: Props) => {
  return (
    <div className="airQuality_details">
      <div className="flex-center flex-col">
        <Image src={image} alt={image} width={40} height={40} />
        <span className="text-md text-white">{desc}</span>
      </div>
      <p className="text-base font-semibold text-white">{value} µg/m²</p>
    </div>
  );
};
export default AirQualityLabels;
