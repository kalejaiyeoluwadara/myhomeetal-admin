import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useProducts = () => {
  const fetchProducts = () =>
    axios
      .get("https://jsonplaceholder.typicode.com/Products")
      .then((res) => res.data);
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 10 * 1000,
  });
};
export default useProducts;
