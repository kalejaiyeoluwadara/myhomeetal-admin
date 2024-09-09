import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobal } from "@/app/context";

const fetchData = async (url, token) => {
  if (!token) {
    throw new Error("Token is not available");
  }

  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const useData2 = (url) => {
  const { token } = useGlobal();

  const { data, error, isLoading } = useQuery({
    queryKey: ["data", url], // Query key
    queryFn: () => fetchData(url, token), // Query function
    enabled: !!token, // Only run the query if token is available
    retry: false, // Disable automatic retries if needed
    onError: (err) => {
      console.error(err); // Optionally handle errors
    },
  });

  // Transform error to a user-friendly message if needed
  const errorMessage = error
    ? error.response
      ? `Failed to fetch data: ${error.response.status} ${error.response.statusText} - ${error.response.data.message}`
      : error.message
    : "";

  return { data, loading: isLoading, error: errorMessage };
};

export default useData2;
