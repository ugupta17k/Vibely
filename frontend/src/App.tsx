import { useEffect, useState } from "react";

type ChatMessage = {
  text: string;
  sender: "me" | "other";
};

export const App = () => {
  const [Socket, setSocket] = useState<null | WebSocket>(null);
  const [Message, setMessage] = useState<ChatMessage[]>([]);
  const [SendMessage, setSendMessage] = useState<string>("");

  useEffect(() => {
    const NewSocket = new WebSocket("ws://localhost:8080");
    NewSocket.onopen = () => {
      console.log("connection established");
    };
    NewSocket.onmessage = (message) => {
      console.log("message recieved", message.data);
       setMessage((prev) => [...prev, { text: message.data, sender: "other" }]);
    };

    setSocket(NewSocket);
    return () => {
      NewSocket.close();
    };
    
  }, []);
  const handleSend = () => {
  Socket?.send(SendMessage);
  setMessage((prev) => [...prev, { text: SendMessage, sender: "me" }]);
  setSendMessage("");
};

  return (
    <div className="">
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-[50%] h-[70%] bg-zinc-300 flex flex-col justify-between items-center py-5 px-4 rounded-xl ">
          <div className="w-full h-90 rounded-x1 bg-zinc-800 flex flex-col text-white px-7 py-5 overflow-y-auto">
            {Message.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div className="bg-zinc-700 px-3 py-2 rounded-xl">{msg.sender}: {msg.text}</div>
              </div>
            ))}
          </div>
          <div className="w-full h-10 flex gap-5">
            <input
            value={SendMessage}
              onChange={(e) => setSendMessage(e.target.value)}
              className=" border border-3 border-black px-5 py-2 w-[20rem] rounded-2xl"
              type="text"
            />
            {/* <textarea className="border border-3 border-black px-5 py-2 w-[20rem] rounded-2xl" name=""  id=""></textarea> */}
            <button
              onClick={handleSend}
              className="border  border-black px-5 py-2 rounded-2xl hover:bg-black hover:text-white cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
