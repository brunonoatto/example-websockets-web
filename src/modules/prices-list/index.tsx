import { useState, useEffect } from "react";

// &listenKey=Ot64l3ypW36U9MzCKn1LPXYHcWHurUu3o3SQ0hkSsPdhB3dcz9KMnDJwvSDEaMja
// const socket = new WebSocket(
//   "wss://fstream-auth.binance.com/stream?streams=btcusdt@markPrice_1m"
// );

type TPricesListProps = {
  coin: string;
};

export default function PriecesList({ coin }: TPricesListProps) {
  const [messages, setMessages] = useState<any[]>([]);

  const onMessage = (event: MessageEvent<any>) => {
    const messageData = JSON.parse(event.data).data;
    const price = Number(messageData.i);
    setMessages((prev) => [
      {
        price,
        percentage:
          prev.length === 0 ? null : (price * 100) / prev[0].price - 100,
      },
      ...prev,
    ]);
  };

  const handleWebSocketAction = (event, action) =>
    console.log(action, { event });

  useEffect(() => {
    setMessages([]);
    const socket = new WebSocket(
      `wss://fstream.binance.com/stream?streams=${coin.toLocaleLowerCase()}@markPrice`
    );

    const actionOpen = (e) => handleWebSocketAction(e, "OPEN!");
    const actionError = (e) => handleWebSocketAction(e, "ERROR!");

    socket.addEventListener("open", actionOpen);
    socket.addEventListener("error", actionError);
    socket.addEventListener("message", onMessage);

    return () => {
      socket.removeEventListener("open", actionOpen);
      socket.removeEventListener("error", actionError);
      socket.removeEventListener("message", onMessage);
      socket.close();
    };
  }, [coin]);

  return (
    <div className="mx-auto space-y-2">
      <p>Selected Coin: {coin}</p>
      {messages.map(({ price, percentage }) => {
        return (
          <div key={`${price}${percentage}`} className="flex gap-4">
            <p>Price: {price}</p>

            {percentage != null && (
              <>
                <p
                  className={`${
                    percentage >= 0 ? "text-lime-500" : "text-red-500"
                  }`}
                >
                  {" "}
                  Percentage: {percentage}
                </p>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
