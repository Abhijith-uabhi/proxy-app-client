import axios from "axios";

const API_BASE_URL = "https://country-state-city-search-rest-api.p.rapidapi.com";
const API_KEY = "2acce79c99msh60666d2c3ec0fbdp167c39jsn6a4182652b19";
const API_HOST = "country-state-city-search-rest-api.p.rapidapi.com";

// Axios instance with default headers
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": API_HOST,
    },
});

// Function to fetch all countries
export const getAllCountries = async () => {
    try {
        const response = await axiosInstance.get("/allcountries");
        return response.data; // Return data to be used elsewhere
    } catch (error) {
        console.error("Error fetching all countries:", error);
        throw error; // Throw error for the calling function to handle
    }
};

// Function to fetch states by country code
export const getStatesByCountryCode = async (countryCode) => {
    try {
        const response = await axiosInstance.get(`/states-by-countrycode`, {
            params: { countrycode: countryCode },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching states for country code ${countryCode}:`, error);
        throw error;
    }
};

// Function to fetch cities by country and state code
export const getCitiesByCountryAndStateCode = async (countryCode, stateCode) => {
    try {
        const response = await axiosInstance.get(
            `/cities-by-countrycode-and-statecode`,
            {
                params: { countrycode: countryCode, statecode: stateCode },
            }
        );
        return response.data;
    } catch (error) {
        console.error(
            `Error fetching cities for country code ${countryCode} and state code ${stateCode}:`,
            error
        );
        throw error;
    }
};


export const getCoordinates = async (location) => {
    try {
        // Format the query for URL
        const formattedLocation = encodeURIComponent(location);
        console.log("the formatted location is", formattedLocation);


        // Using Nominatim API (OpenStreetMap)
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${formattedLocation}&format=json&limit=1`,
            {}
        );

        if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            return {
                latitude: parseFloat(lat),
                longitude: parseFloat(lon),
                type: "Point"
            };
        } else {
            throw new Error('Location not found');
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
}

