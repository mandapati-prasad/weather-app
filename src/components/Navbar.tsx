import React, { ReactElement, useState } from "react";
import { IoMdSunny } from "react-icons/io";
import { MdMyLocation } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";
import SearchBox from "./SearchBox";
import axios from "axios";
import { useAtom } from "jotai";
import { locationLoader, placeAtom } from "@/app/atom";
import { getLocation } from "@/utils/getlocation";
import SuggestionBox from "./SuggestionBox.";

interface Props {}
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

export default function Navbar({}: Props): ReactElement {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowsuggestions] = useState(false);
  const [place, setPlace] = useAtom(placeAtom);
  const [_, setLoader] = useAtom(locationLoader);

  async function handleInputChange(value: string) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}`
        );
        console.log(response.data)
        const newSuggestions = response.data.list.map(
          (item: any) => item.name
        );
        setSuggestions(newSuggestions);
        setError("");
        setShowsuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowsuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowsuggestions(false);
    }
  }

  function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    setLoader(true);
    e.preventDefault();
    if (suggestions.length === 0) {
      setError("Location not found");
      setLoader(false);
    } else {
      setError("");
      setTimeout(() => {
        setCity("");
        setPlace(location);
        setShowsuggestions(false);
        setLoader(false);
      }, 500);
    }
  }

  function handleSuggestionClick(value: string) {
    setCity(value);
    setLocation(value);
    setShowsuggestions(false);
  }

  async function handleCurrentLocation() {
    setLoader(true);
    const currentLocation = await getLocation();
    setTimeout(() => {
      setPlace(currentLocation);
      setLoader(false);
    }, 500);
  }

  return (
    <nav className="sticky top-0 md:top-10 left-0 z-50 md:bg-gray-900 md:bg-opacity-85 md:rounded-full max-w-7xl mx-auto md:px-5">
      <div className="py-5 gap-3 md:py-0 md:h-16 flex flex-col md:flex-row w-full justify-between items-center max-w-7xl mx-auto px-5">
        <span className="flex justify-center items-center gap-2">
          <h2 className="text-3xl font-semibold text-gray-200">Weather</h2>
          <IoMdSunny className="text-3xl text-yellow-300" />
        </span>
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div className="flex justify-center w-full items-center gap-2">
            <MdMyLocation
              className="text-3xl text-gray-200 cursor-pointer"
              onClick={handleCurrentLocation}
            />
            <MdLocationPin className="text-3xl text-gray-200" />
            <p className="text-md font-semibold text-gray-200">{place}</p>
          </div>
          <div className="flex w-full min-w-[300px] relative">
            <SearchBox
              value={city}
              onSubmit={(e) => handleSubmitSearch(e)}
              onChange={(e) => handleInputChange(e.target.value)}
            />

            <SuggestionBox
              showSuggestions={showSuggestions}
              suggestions={suggestions}
              error={error}
              handleSuggestionClick={handleSuggestionClick}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

// export function SuggestionBox({
//   showSuggestions,
//   suggestions,
//   handleSuggestionClick,
//   error,
// }: {
//   showSuggestions: Boolean;
//   suggestions: string[];
//   handleSuggestionClick: (item: string) => void;
//   error: string;
// }) {
//   return (
//     <>
//       {((showSuggestions && suggestions.length > 0) || error) && (
//         <ul className="mb-4 bg-white max-h-[300px] overflow-y-auto absolute border top-[44px] right-0 border-gray-300 rounded-md min-w-[250px] flex flex-col gap-1 p-2">
//           {error && suggestions.length < 1 && (
//             <li className="text-red-500 p-1">{error}</li>
//           )}
//           {suggestions.map((item, i) => {
//             return (
//               <li
//                 key={i}
//                 onClick={() => handleSuggestionClick(item)}
//                 className="cursor-pointer p-1 rounded hover:bg-gray-200"
//               >
//                 {item}
//               </li>
//             );
//           })}
//         </ul>
//       )}
//     </>
//   );
// }
