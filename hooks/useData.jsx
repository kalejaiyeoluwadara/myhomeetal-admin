"use client";

import { useGlobal } from "@/app/context";
import { useState, useEffect } from "react";
import axios from "axios";

const useData = (url) => {
  const { token } = useGlobal();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data);
      } catch (error) {
        setError(
          error.response
            ? `Failed to fetch products: ${error.response.status} ${error.response.statusText} - ${error.response.data.message}`
            : error.message
        );
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, token]);

  return { data, loading, error, setData };
};

export default useData;
