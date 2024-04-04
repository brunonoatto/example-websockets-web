import { useQuery } from "@tanstack/react-query";
import ServiceApi from "../api";

export const useCoinsList = () => {
  return useQuery({
    queryKey: ["useCoinsList"],
    queryFn: async () => {
      const data = await ServiceApi.Binance.listCoins();

      return data.filter((item) => item.status === "TRADING");
    },
  });
};
