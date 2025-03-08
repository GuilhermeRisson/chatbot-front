"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, MoreVertical, Paperclip, Send, Check, CheckCheck, Image, Smile, Mic, Phone, Video } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hey, how's it going?",
    timestamp: "10:30 AM",
    unread: 3,
    online: true,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Can you help me with something?",
    timestamp: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Michael Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for the information!",
    timestamp: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: 4,
    name: "Emily Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I'll check and get back to you",
    timestamp: "Monday",
    unread: 1,
    online: false,
  },
  {
    id: 5,
    name: "Robert Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "When will the product be available?",
    timestamp: "Sunday",
    unread: 0,
    online: false,
  },
]

// Mock messages for a conversation
const mockMessages = [
  {
    id: 1,
    senderId: 1, // user
    text: "Hey, how's it going?",
    timestamp: "10:30 AM",
    status: "read", // sent, delivered, read
  },
  {
    id: 2,
    senderId: 0, // admin/self
    text: "Hi there! I'm doing well, thanks for asking. How can I help you today?",
    timestamp: "10:31 AM",
    status: "read",
  },
  {
    id: 3,
    senderId: 1,
    text: "I have a question about your services. Do you offer custom solutions?",
    timestamp: "10:32 AM",
    status: "read",
  },
  {
    id: 4,
    senderId: 0,
    text: "Yes, we definitely offer custom solutions tailored to your specific needs. Could you tell me more about what you're looking for?",
    timestamp: "10:33 AM",
    status: "read",
  },
  {
    id: 5,
    senderId: 1,
    text: "Great! I need a chatbot for my e-commerce website that can handle customer inquiries and process orders.",
    timestamp: "10:35 AM",
    status: "read",
  },
  {
    id: 6,
    senderId: 0,
    text: "We can definitely help with that. Our chatbots can be integrated with your e-commerce platform to handle inquiries, provide product recommendations, and even process orders.",
    timestamp: "10:36 AM",
    status: "delivered",
  },
]

export default function ChatsPage() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1)
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Filter conversations based on search term
  const filteredConversations = mockConversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Send a new message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const newMsg = {
      id: messages.length + 1,
      senderId: 0, // admin/self
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent" as const,
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  // Get the selected conversation
  const currentConversation = mockConversations.find((conversation) => conversation.id === selectedConversation)

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col">
      <div className="flex-1 flex overflow-hidden rounded-lg bg-black/40 backdrop-blur-xl border border-white/10">
        {/* Conversations Sidebar */}
        <div className="w-full md:w-80 border-r border-white/10 flex flex-col">
          <div className="p-4 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search conversations"
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={cn(
                  "flex items-center gap-3 p-4 cursor-pointer hover:bg-white/5 transition-colors",
                  selectedConversation === conversation.id && "bg-white/10",
                )}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={conversation.avatar} alt={conversation.name} />
                    <AvatarFallback className="bg-purple-600 text-white">
                      {conversation.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-black" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-white truncate">{conversation.name}</h3>
                    <span className="text-xs text-gray-400">{conversation.timestamp}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-400 truncate">{conversation.lastMessage}</p>
                    {conversation.unread > 0 && (
                      <span className="h-5 w-5 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedConversation ? (
          <div className="hidden md:flex flex-1 flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={currentConversation?.avatar} alt={currentConversation?.name} />
                  <AvatarFallback className="bg-purple-600 text-white">
                    {currentConversation?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-white">{currentConversation?.name}</h3>
                  <p className="text-xs text-gray-400">{currentConversation?.online ? "Online" : "Offline"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={cn("flex", message.senderId === 0 ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[70%] rounded-lg px-4 py-2 space-y-1",
                      message.senderId === 0
                        ? "bg-purple-600 text-white rounded-br-none"
                        : "bg-white/10 text-white rounded-bl-none",
                    )}
                  >
                    <p>{message.text}</p>
                    <div className="flex justify-end items-center gap-1 text-xs">
                      <span className={message.senderId === 0 ? "text-white/70" : "text-gray-400"}>
                        {message.timestamp}
                      </span>
                      {message.senderId === 0 && (
                        <span>
                          {message.status === "sent" && <Check className="h-3 w-3 text-white/70" />}
                          {message.status === "delivered" && <CheckCheck className="h-3 w-3 text-white/70" />}
                          {message.status === "read" && <CheckCheck className="h-3 w-3 text-blue-400" />}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-white/10">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <Smile className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <Image className="h-5 w-5" />
                </Button>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message"
                  className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <Mic className="h-5 w-5" />
                </Button>
                <Button
                  type="submit"
                  size="icon"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-medium text-white mb-2">Select a conversation</h3>
              <p className="text-gray-400">Choose a chat from the list to start messaging</p>
            </div>
          </div>
        )}

        {/* Mobile View - Show only selected conversation or list */}
        <div className="md:hidden flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header with back button */}
              <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-white/10 mr-1"
                    onClick={() => setSelectedConversation(null)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </Button>
                  <Avatar>
                    <AvatarImage src={currentConversation?.avatar} alt={currentConversation?.name} />
                    <AvatarFallback className="bg-purple-600 text-white">
                      {currentConversation?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-white">{currentConversation?.name}</h3>
                    <p className="text-xs text-gray-400">{currentConversation?.online ? "Online" : "Offline"}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn("flex", message.senderId === 0 ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[70%] rounded-lg px-4 py-2 space-y-1",
                        message.senderId === 0
                          ? "bg-purple-600 text-white rounded-br-none"
                          : "bg-white/10 text-white rounded-bl-none",
                      )}
                    >
                      <p>{message.text}</p>
                      <div className="flex justify-end items-center gap-1 text-xs">
                        <span className={message.senderId === 0 ? "text-white/70" : "text-gray-400"}>
                          {message.timestamp}
                        </span>
                        {message.senderId === 0 && (
                          <span>
                            {message.status === "sent" && <Check className="h-3 w-3 text-white/70" />}
                            {message.status === "delivered" && <CheckCheck className="h-3 w-3 text-white/70" />}
                            {message.status === "read" && <CheckCheck className="h-3 w-3 text-blue-400" />}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-white/10">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-white/10"
                  >
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-white/10"
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                    className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <>
              {/* Conversations List for Mobile */}
              <div className="p-4 border-b border-white/10">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search conversations"
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className="flex items-center gap-3 p-4 cursor-pointer hover:bg-white/5 transition-colors"
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conversation.avatar} alt={conversation.name} />
                        <AvatarFallback className="bg-purple-600 text-white">
                          {conversation.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-black" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-white truncate">{conversation.name}</h3>
                        <span className="text-xs text-gray-400">{conversation.timestamp}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-400 truncate">{conversation.lastMessage}</p>
                        {conversation.unread > 0 && (
                          <span className="h-5 w-5 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

