"use client";

import Container from "@/components/Container";
import ForcastWeatherDetails from "@/components/ForcastWeatherDetails";
import Navbar from "@/components/Navbar";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherIcon from "@/components/WeatherIcon";
import { convertSpeed } from "@/utils/convertSpeed";
import { getDayOrNightIcon } from "@/utils/dayAndNightIcon";
import { kelvinToCelsius } from "@/utils/kelvinToCelsius";
import { metersToKilometers } from "@/utils/metersToKilometers";
import axios, { AxiosError } from "axios";
import { parseISO, format, fromUnixTime } from "date-fns";
import { useAtom } from "jotai";
import Image from "next/image";
import { useQuery } from "react-query";
import { climate, locationLoader, placeAtom } from "../atom";
import { useEffect, useState } from "react";
import SkeletonLoader from "@/components/SkeletonLoader";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
// https://api.openweathermap.org/data/2.5/weather?q=pune&appid={API_KEY}

interface WeatherData {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface WeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export default function Home({
  params,
}: {
  params: { weatherDetails: string };
}) {
  const [place, setPlace] = useAtom(placeAtom);
  const [loader, setLoader] = useAtom(locationLoader);
  const [errorMessage, setErrorMessage] = useState(null);
  const [src, setSrc] = useAtom(climate);

  const { isLoading, error, data, refetch } = useQuery<WeatherResponse>(
    "repoData",
    async () => {
      try {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${API_KEY}`
        );
        console.log("data", data);
        setErrorMessage(null);
        return data;
      } catch (error: any) {
        const { message } = error.response.data;
        setErrorMessage(message);
        return null;
      }
    }
  );

  useEffect(() => {
    refetch();
  }, [refetch, place]);

  const firstData = data?.list[0];

  if (firstData?.weather[0].description.includes("rain")) {
    setSrc("rainy");
  } else if (firstData?.weather[0].description.includes("clear sky")) {
    setSrc("clearsky");
  } else if (firstData?.weather[0].description.includes("	thunderstorm")) {
    setSrc("strom");
  } else if (firstData?.weather[0].description.includes("overcast")) {
    setSrc("overcast");
  } else if (firstData?.weather[0].description.includes("cloud")) {
    setSrc("cloudy");
  } else if (firstData?.weather[0].description.includes("snow")) {
    setSrc("snow");
  } else if (firstData?.weather[0].description.includes("mist")) {
    setSrc("mist");
  } else {
    setSrc("sunny");
  }

  const uniqueDates = [
    ...new Set(
      data?.list.map((entry) => {
        return new Date(entry.dt * 1000).toISOString().split("T")[0];
      })
    ),
  ];

  const firstDateForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  // console.log("uniqueDates", uniqueDates);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-screen pb-[50%] md:py-[5%] overflow-auto">
      {loader ? (
        <SkeletonLoader />
      ) : data === null ? (
        <main className="flex flex-col px-3 max-w-7xl  mx-auto w-full gap-9 pb-10 pt-4">
          <Container className="justify-center min-h-[50vh] items-center text-3xl text-white">
            {errorMessage}
          </Container>
        </main>
      ) : (
        <main className="flex flex-col px-3 max-w-7xl mx-auto w-full gap-9 pb-10 pt-4">
          <section className="flex flex-col gap-10">
            <div className="space-y-4">
              <p className="text-5xl mr-5 text-center font-semibold">
                {data?.city.name}
              </p>
              <h2 className="flex gap-1 text-2xl items-end">
                <p className="text-yellow-300">
                  {format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}
                </p>
                <p className="text-lg text-gray-900 font-semibold">
                  ({format(parseISO(firstData?.dt_txt ?? ""), "MM/dd/yyyy")})
                </p>
              </h2>
              <Container className="gap-10 flex-col md:flex-row items-center shadow-[0_0_5px_rgba(0,0,0,0.5)]  bg-gray-200 md:bg-transparent bg-opacity-55 backdrop-blur-[2px] md:shadow-none">
                {/* temperature details */}
                <div className="flex flex-col p-4 md:p-8 rounded-lg md:bg-gray-200 md:bg-opacity-55 md:backdrop-blur-[2px] items-center space-y-2">
                  <span className="text-5xl">
                    {kelvinToCelsius(firstData?.main.temp ?? 230)}°
                  </span>
                  <p className="text-sm space-x-1 whitespace-nowrap">
                    <span>Feels Like:</span>
                    <span>
                      {kelvinToCelsius(firstData?.main.feels_like ?? 0)}°
                    </span>
                  </p>
                  <p className="text-sm font-semibold space-x-3 whitespace-nowrap">
                    <span>
                      {kelvinToCelsius(firstData?.main.temp_min ?? 0)}°↓
                    </span>
                    <span>
                      {kelvinToCelsius(firstData?.main.temp_max ?? 0)}°↑
                    </span>
                  </p>
                </div>
                {/* time and weather icons */}
                <div className="flex gap-5 rounded-lg bg-transparent md:bg-gray-200 md:bg-opacity-55 md:backdrop-blur-[2px] overflow-x-auto w-full justify-between px-3 py-2">
                  {data?.list.map((d, i) => {
                    return (
                      <div
                        key={i}
                        className="flex flex-col justify-between gap-2 items-center font-semibold"
                      >
                        <p className="whitespace-nowrap">
                          {format(parseISO(d?.dt_txt ?? ""), "h:mm a")}
                        </p>
                        <WeatherIcon
                          iconname={getDayOrNightIcon(
                            d.weather[0].icon,
                            d.dt_txt
                          )}
                          className="drop-shadow-[0_5px_5px_rgba(50,50,50,0.4)]"
                        />
                        <p>{kelvinToCelsius(d?.main.temp ?? 0)}°</p>
                      </div>
                    );
                  })}
                </div>
              </Container>
            </div>

            <div className="flex flex-col md:flex-row gap-10">
              <Container className="w-full md:w-fit flex-grow justify-center items-center flex-col px-4 shadow-xl bg-gray-200 bg-opacity-55 backdrop-blur-[2px]">
                <p className="capitalize text-xl font-medium">
                  {firstData?.weather[0].description}
                </p>
                <WeatherIcon
                  iconname={getDayOrNightIcon(
                    firstData?.weather[0].icon ?? " ",
                    firstData?.dt_txt ?? " "
                  )}
                  className="h-32 w-32 drop-shadow-[0_5px_5px_rgba(50,50,50,0.4)]"
                />
              </Container>
              <Container className="w-full bg-yellow-300 bg-opacity-55 backdrop-blur-[2px] border-none overflow-x-auto shadow-xl">
                <WeatherDetails
                  visibility={metersToKilometers(firstData?.visibility ?? 1000)}
                  humidity={`${firstData?.main.humidity ?? 0}%`}
                  windSpeed={convertSpeed(firstData?.wind.speed ?? 1080)}
                  airPressure={`${firstData?.main.pressure}hpa`}
                  sunrise={format(
                    fromUnixTime(data?.city.sunrise ?? 1712881708),
                    "H:mm"
                  )}
                  sunset={format(
                    fromUnixTime(data?.city.sunset ?? 1712881708),
                    "H:mm"
                  )}
                />
              </Container>
            </div>
          </section>

          <section className="flex flex-col w-full gap-10">
            <h2 className="text-2xl font-medium text-gray-300">
              5 Day Forcast
            </h2>
            {firstDateForEachDate.map((d, i) => {
              return (
                <ForcastWeatherDetails
                  key={i}
                  description={d?.weather[0].description ?? ""}
                  weatherIcon={d?.weather[0].icon ?? "01d"}
                  temp={d?.main.temp ?? 0}
                  date={format(parseISO(d?.dt_txt ?? ""), "dd.MM")}
                  day={format(parseISO(d?.dt_txt ?? ""), "EEEE")}
                  feels_like={d?.main.feels_like ?? 0}
                  temp_max={d?.main.temp_max ?? 0}
                  temp_min={d?.main.temp_min ?? 0}
                  visibility={metersToKilometers(d?.visibility ?? 10000)}
                  humidity={`${d?.main.humidity ?? 0}%`}
                  windSpeed={convertSpeed(d?.wind.speed ?? 1080)}
                  airPressure={`${d?.main.pressure}hpa`}
                  sunrise={format(
                    fromUnixTime(data?.city.sunrise ?? 1712881708),
                    "H:mm"
                  )}
                  sunset={format(
                    fromUnixTime(data?.city.sunset ?? 1712881708),
                    "H:mm"
                  )}
                />
              );
            })}
          </section>
        </main>
      )}
    </div>
  );
}
