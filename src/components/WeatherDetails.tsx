import React, { ReactElement } from "react";
import { FaEye } from "react-icons/fa";
import { IoWater, IoSpeedometer } from "react-icons/io5";
import { GiWindSlap, GiSunrise, GiSunset } from "react-icons/gi";
import { cn } from "@/utils/cn";

export interface WeatherDetailProps {
  visibility: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
  className?: string;
}

export interface SingleWeatherDetailProps {
  information: string;
  icon: React.ReactNode;
 value: string;
}

export default function WeatherDetails({
  visibility,
  humidity,
  windSpeed,
  airPressure,
  sunrise,
  sunset,
  className,
}: WeatherDetailProps) {
  return (
    <div className={cn("flex px-8 gap-14 lg:w-full justify-between", className)}>
      <SingleWeatherDetails
        icon={<FaEye />}
        information="Visibility"
        value={visibility}
      />
      <SingleWeatherDetails
        icon={<IoWater />}
        information="Humidity"
        value={humidity}
      />
      <SingleWeatherDetails
        icon={<GiWindSlap />}
        information="WindSpeed"
        value={windSpeed}
      />
      <SingleWeatherDetails
        icon={<IoSpeedometer />}
        information="AirPressure"
        value={airPressure}
      />
      <SingleWeatherDetails
        icon={<GiSunrise />}
        information="Sunrise"
        value={sunrise}
      />
      <SingleWeatherDetails
        icon={<GiSunset />}
        information="Sunset"
        value={sunset}
      />
    </div>
  );
}

function SingleWeatherDetails({
  information,
  icon,
  value,
}: SingleWeatherDetailProps) {
  return (
    <div className="flex flex-col justify-evenly gap-2 items-center text-xs font-semibold">
      <p className="whitespace-nowrap text-lg">{information}</p>
      <div className="text-5xl">{icon}</div>
      <p className="text-sm">{value}</p>
    </div>
  );
}
