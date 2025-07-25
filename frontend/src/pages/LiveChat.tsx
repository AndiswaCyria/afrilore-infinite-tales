import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";
import Navigation from "@/components/Navigation";
import { toast } from "@/hooks/use-toast";
import { io } from "socket.io-client";
import axios from "axios";

const LiveChat = () => {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch stored messages on load
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("/api/chat");
        setMessages(res.data); // Set messages from DB
      } catch (err) {
        toast({
          title: "Error loading chat",
          description: "Could not load chat history.",
          variant: "destructive",
        });
      }
    };

    fetchMessages();
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      await axios.post("/api/chat", newMessage);

      const botReply = {
        from: "bot",
        text: "Thanks! A support agent will join shortly.",
      };

      setTimeout(async () => {
        setMessages((prev) => [...prev, botReply]);
        await axios.post("/api/chat", botReply);
      }, 1000);
    } catch (err) {
      toast({
        title: "Message failed",
        description: "Could not send message.",
        variant: "destructive",
      });
    }
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



