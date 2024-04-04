import axios from "axios";
import { sortAsc } from "../shared/helpers/array";

export type TSymbol = {
  symbol: string;
  status: string;
};
type TListCoinResponse = {
  symbols: TSymbol[];
};

export const listCoins = async () => {
  const { data } = await axios.get<TListCoinResponse>(
    "https://api.binance.com/api/v3/exchangeInfo"
  );

  return sortAsc(data.symbols, "symbol");
};
