"use client";

import { useGlobal } from "@/app/context";
import { useState, useEffect } from "react";

const useData = (url) => {
  const { token } = useGlobal();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Failed to fetch products: ${response.status} ${response.statusText} - ${errorData.message}`
          );
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
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
