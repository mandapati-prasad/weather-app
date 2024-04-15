import React, { ReactElement } from "react";
import WeatherDetails, { WeatherDetailProps } from "./WeatherDetails";
import Container from "./Container";
import WeatherIcon from "./WeatherIcon";
import { kelvinToCelsius } from "@/utils/kelvinToCelsius";

interface Props extends WeatherDetailProps {
  weatherIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

export default function ForcastWeatherDetails(props: Props): ReactElement {
  const {
    weatherIcon,
    date,
    day,
    temp,
    feels_like,
    temp_min,
    temp_max,
    description,
  } = props;
  return (
    <Container className="overflow-x-auto">
      <section className="flex w-full justify-evenly md:flex-row gap-10">
        <div className="flex min-w-[150px] pb-4 flex-col bg-gray-200 bg-opacity-55 backdrop-blur-[2px] rounded-full justify-center items-center">
          <WeatherIcon
            iconname={weatherIcon}
            className="drop-shadow-[0_3px_3px_rgba(50,50,50,0.3)]"
          />
          <p className="font-medium">{date}</p>
          <p className="font-semibold">{day}</p>
        </div>

        <div className="flex flex-col min-w-[150px] bg-yellow-300 bg-opacity-75 backdrop-blur-[2px] rounded-xl justify-center items-center ">
          <span className="text-4xl font-semibold">
            {kelvinToCelsius(temp ?? 0)}°
          </span>
          <p>
            <span className="font-semibold">Feels Like</span>{" "}
            {kelvinToCelsius(feels_like ?? 0)}°
          </p>
          <p>
            <span>{kelvinToCelsius(temp_min ?? 0)}°↓</span>
            <span>{kelvinToCelsius(temp_max ?? 0)}°↑</span>
          </p>
          <p className="font-semibold">{description}</p>
        </div>

        <div className="flex flex-col text-xl bg-black bg-opacity-65 backdrop-blur-[2px] justify-center text-gray-400 rounded-xl items-center">
          <WeatherDetails {...props}/>
        </div>
      </section>
    </Container> 
  );
}
