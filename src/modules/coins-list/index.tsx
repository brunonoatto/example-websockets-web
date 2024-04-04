import { useEffect, useState } from "react";
import { useCoinsList } from "../../hooks/binance";
import { TSymbol } from "../../api/binance";

type TCoinsListProps = {
  setCoin: (coin: string) => void;
};

export default function CoinsList({ setCoin }: TCoinsListProps) {
  const [filteredCoins, setFilteredCoins] = useState<TSymbol[]>([]);
  const { data: symbols, isLoading } = useCoinsList();
  console.log({ symbols });

  const onFilterCoins: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const filter = event.target.value;

    setFilteredCoins(
      () =>
        (filter
          ? symbols?.filter((s) => s.symbol.includes(filter.toUpperCase()))
          : symbols) || []
    );
  };

  useEffect(() => {
    if (symbols) setFilteredCoins(symbols);
  }, [symbols]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-screen overflow-auto p-2 space-y-1">
      <label className="flex flex-col space-y-1 mb-2">
        Coin:
        <input
          className=" border-2 border-lime-400 bg-zinc-600 rounded-lg p-1"
          type="text"
          onChange={onFilterCoins}
        />
      </label>

      {filteredCoins?.map(({ symbol }) => (
        <button
          key={symbol}
          className="hover:ring-1 hover:ring-lime-300 rounded-lg"
          onClick={() => setCoin(symbol)}
        >
          {symbol}
        </button>
      ))}
    </div>
  );
}
