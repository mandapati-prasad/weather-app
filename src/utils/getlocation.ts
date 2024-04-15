import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

// export function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(async (position) => {
//       const { latitude, longitude } = position.coords;
//       try {
//         const response = await axios.get(
//           `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
//         );
//         return response.data.name;
//       } catch (error) {
//         console.log(error);
//       }
//     });
//   }
// }


export function getLocation(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
            );
            resolve(response.data.name); // Resolve with the location name
          } catch (error) {
            console.error(error);
            reject("Error fetching location."); // Reject with an error message
          }
        },
        (error) => {
          console.error(error);
          reject("Geolocation error."); // Reject with an error message
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      reject("Geolocation is not supported."); // Reject with an error message
    }
  });
}
