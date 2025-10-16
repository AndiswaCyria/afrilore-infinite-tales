import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";
import Navigation from "@/components/Navigation";
import { toast } from "@/hooks/use-toast";
import { io, Socket } from "socket.io-client";

const LiveChat = () => {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Connect to socket and fetch messages
  useEffect(() => {
    const newSocket = io("https://afrilore-infinite-tales.onrender.com");
    
    newSocket.on("connect", () => {
      setIsConnected(true);
      toast({
        title: "Connected",
        description: "Connected to chat server",
      });
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    // Listen for user and bot messages from backend
    newSocket.on("userMessage", (message: { from: string; text: string }) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on("botMessage", (message: { from: string; text: string }) => {
      setMessages((prev) => [...prev, message]);
    });

    setSocket(newSocket);

    // Fetch initial messages
    fetch("https://afrilore-infinite-tales.onrender.com/api/chat")
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(() => {
        toast({
          title: "Error loading chat",
          description: "Could not load chat history.",
          variant: "destructive",
        });
      });

    return () => newSocket.close();
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSend = () => {
    if (!input.trim() || !socket || !isConnected) return;

    // Emit just the text as backend expects
    socket.emit("chatMessage", input);
    setInput("");
  };

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
                      msg.from === "User"
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



