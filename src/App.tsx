import { useState } from "react";
import CoinsList from "./modules/coins-list";
import PriecesList from "./modules/prices-list";

function App() {
  const [selectedCoin, setSelectedCoin] = useState("BTCUSDT");

  return (
    <div className="flex bg-zinc-700 text-zinc-100">
      <CoinsList setCoin={setSelectedCoin} />
      <PriecesList coin={selectedCoin} />
    </div>
  );
}

export default App;
