"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { getLocation } from "@/utils/getlocation";
import { useAtom } from "jotai";
import { placeAtom } from "./atom";
import SuggestionBox from "@/components/SuggestionBox.";
import { useRouter } from "next/navigation";
import { BsBuildings } from "react-icons/bs";
import { IoMdGlobe } from "react-icons/io";
import { MdManageSearch, MdAccessTime, MdGroups } from "react-icons/md";


interface City {
  name: string;
  country: string;
  timezone: string;
  population:number;
}

const CityTable: React.FC = () => {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const [showSuggestions, setShowsuggestions] = useState(false);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [place, setPlace] = useAtom(placeAtom);
  const router = useRouter();

  async function handleCurrentLocation() {
    const currentLocation = await getLocation();
    console.log(currentLocation);
    setPlace(currentLocation);
  }

  useEffect(() => {
    loadCities();
    handleCurrentLocation();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [containerRef, cities]);

  const loadCities = async () => {
    try {
      const response = await axios.get(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?order_by=country_code&limit=80&offset=${
          (page - 1) * 80
        }`
      );
      const cityData = response.data.results.map((record: any) => ({
        name: record.name,
        country: record.cou_name_en,
        timezone: record.timezone,
        population: record.population,
      }));
      setCities((prevCities) => [...prevCities, ...cityData]);
      if (city.length === 0) {
        setFilteredCities(cities);
      }
      setIsLoading(false);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setIsLoading(false);
    }
  };

  const handleIntersection: IntersectionObserverCallback = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading) {
      loadCities();
    }
  };

  const handleSearchInputChange = async (value: string) => {
    console.log(value);
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          // `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}`
          ` https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=search(alternate_names%2C%20%22${value}%22)&limit=100&offset=0`
        );
        const newSuggestions = response.data.results.map(
          (item: any) => item.name
        );

        const newfilter = response.data.results.map((item: any) => item);
        if (city.length !== 0) {
          setFilteredCities(newfilter);
        }
        setSuggestions(newSuggestions);
        setError("");
        setShowsuggestions(true);
      } catch (error) {
        console.log(city.length);
        setSuggestions([]);
        setShowsuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowsuggestions(false);
    }
  };

  function handleSuggestionClick(value: string) {
    const newfilter = filteredCities.filter((item) => item.name === value);
    setCity(value);
    console.log("city", city);
    if (city.length !== 0) {
      setFilteredCities(newfilter);
    }
    setShowsuggestions(false);
  }

  function handlenav(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    city: string
  ) {
    e.preventDefault();
    setPlace(city);
    router.push(`/${city}`);
  }

  return (
    <div className="flex flex-col max-w-7xl mx-auto px-5 overflow-hidden">
      <div className="h-[68vh] md:h-[90vh] lg:h-[88vh] gap-20 md:gap-10 lg:gap-20 flex flex-col justify-center items-center">
        <div className="relative md:mt-10">
          <div className=" bg-gray-100 bg-opacity-55 rounded-md relative min-w-[280px]">
            <input
              type="text"
              placeholder="Search City"
              name="name"
              value={city}
              onChange={(e) => handleSearchInputChange(e.target.value)}
              className="focus:outline-none p-2 rounded-md bg-transparent placeholder:text-black"
            />
            <span className="absolute top-1 right-1 text-gray-900 text-3xl">
              <MdManageSearch />
            </span>
          </div>
          <SuggestionBox
            showSuggestions={showSuggestions}
            suggestions={suggestions}
            error={error}
            handleSuggestionClick={handleSuggestionClick}
            className="left-0 max-w-[200px] z-50"
          />
        </div>
        <section className="h-[400px] bg-gray-800 bg-opacity-50 backdrop-blur-sm shadow-[0_0_10px_rgba(100,100,100,0.8)] rounded-lg w-full lg:w-[902px] flex justify-center overflow-x-auto md:pb-2">
          <div className="overflow-auto relative">
            <div className="flex sticky text-yellow-300 top-0 z-1 justify-between min-w-[900px] font-semibold text-lg bg-black">
              <div className="py-2 px-3 w-full">
                <span className="flex gap-2 items-center">
                  <span className="text-2xl">
                    <BsBuildings />
                  </span>
                  City Name
                </span>
              </div>
              <div className="p-2 px-3 w-full">
                <span className="flex gap-2 items-center">
                  <span className="text-2xl">
                    <IoMdGlobe />
                  </span>
                  Country
                </span>
              </div>
              <div className="p-2 px-3 w-full">
                <span className="flex gap-2 items-center">
                  <span className="text-2xl">
                    <MdAccessTime />
                  </span>
                  Time Zone
                </span>
              </div>
              <div className="p-2 px-3 w-full">
                <span className="flex gap-2 items-center">
                  <span className="text-2xl">
                    <MdGroups />
                  </span>
                  population
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between min-w-[900px]">
              {filteredCities.map((city, index) => (
                <div
                  key={index}
                  className="cursor-pointer flex hover:bg-gray-300 hover:text-black transition-all duration-300 text-gray-300"
                  onClick={(e) => handlenav(e, city.name)}
                >
                  <div className="w-full px-4 py-3">{city.name}</div>
                  <div className="w-full px-4 py-3">{city.country}</div>
                  <div className="w-full px-4 py-3">{city.timezone}</div>
                  <div className="w-full px-4 py-3">{city.population}</div>
                </div>
              ))}
            </div>
            <div ref={containerRef}></div>
            {isLoading && <p className="text-2xl text-white h-full flex justify-center items-center">Loading...</p>}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CityTable;
