import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";
import Navigation from "@/components/Navigation";
import { toast } from "@/hooks/use-toast";
import { io } from "socket.io-client";

const socket = io("https://afrilore-infinite-tales.onrender.com", {
  transports: ["websocket"],
  withCredentials: true,
});

const LiveChat = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi there! How can we help you today?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    // Show user's message
    const newMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    // Send to server
    socket.emit("chatMessage", input);

    setInput("");
  };

  useEffect(() => {
    // Scroll to bottom on new message
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Listen for bot/agent responses
    socket.on("botMessage", (msg: string) => {
      setMessages((prev) => [...prev, { from: "bot", text: msg }]);
    });

    return () => {
      socket.off("botMessage");
    };
  }, []);

  return (
    <>
      <Navigation />
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto max-w-2xl px-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair">Live Chat Support</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-[500px]">
              <div className="flex-1 overflow-y-auto space-y-3 mb-4 p-2 bg-background border rounded">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      msg.from === "user"
                        ? "ml-auto bg-primary text-white"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                />
                <Button onClick={handleSend}>
                  <Send className="h-4 w-4 mr-1" /> Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

export default LiveChat;

