"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Bot, MessageSquare, Sparkles, Zap, BarChart, Shield, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function LandingPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState([{ role: "assistant", content: "Oi! Como posso ajudá-lo hoje?" }])
  const [input, setInput] = useState("")

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setMessages([
      ...messages,
      { role: "user", content: input },
      { role: "assistant", content: "Obrigado por sua mensagem! Esta é uma demonstração de como nosso chatbot funciona." },
    ])
    setInput("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400 backdrop-blur-xl">
                <span className="flex items-center text-sm font-medium">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Solução empresarial
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Transforme a comunicação da sua empresa
              </h1>
              <p className="text-lg text-gray-400 max-w-xl">
              Automatize o atendimento ao cliente, aumente o engajamento e expanda seus negócios com nosso chatbot inteligente do WhatsApp.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-lg px-8 py-6">
                    Cadastre-se aqui
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-lg px-8 py-6">
                    Entrar
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                {/* <Button
                  variant="outline"
                  className="border-white/20 bg-white/10 text-white hover:bg-white/20 text-lg px-8 py-6"
                  onClick={() => setIsChatOpen(true)}
                >
                  Try Demo
                  <Bot className="ml-2 h-5 w-5" />
                </Button> */}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-transparent to-purple-600/10 animate-pulse rounded-2xl" />
              <Card className="border-0 bg-black/40 backdrop-blur-xl relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Bot className="h-6 w-6 text-purple-500" />
                      <h3 className="text-lg font-semibold text-white">WhatsApp Business Bot</h3>
                    </div>
                    <div className="space-y-4 min-h-[300px] max-h-[300px] overflow-y-auto">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`rounded-lg px-4 py-2 max-w-[80%] ${
                              message.role === "user" ? "bg-purple-600 text-white" : "bg-white/10 text-white"
                            }`}
                          >
                            {message.content}
                          </div>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={sendMessage} className="flex gap-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                      <Button type="submit">Send</Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-black/40">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Recursos poderosos para o seu negócio</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Tudo que você precisa para automatizar e aprimorar a comunicação com o cliente
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Respostas instantâneas",
                description: "Respostas extremamente rápidas",
              },
              {
                icon: BarChart,
                title: "Painel analítico",
                description: "Rastreie e analise as interações do cliente",
              },
              {
                icon: Shield,
                title: "Seguro e confiável",
                description: "Segurança de nível empresarial para o seu negócio",
              },
              {
                icon: Bot,
                title: "Alimentado por IA",
                description: "Respostas inteligentes que aprendem com as interações",
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 bg-white/5 hover:bg-white/10 transition-colors">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <Card className="border-0 bg-gradient-to-r from-violet-600/20 to-purple-600/20 backdrop-blur-xl">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Pronto para transformar seu negócio?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                Junte-se a empresas que já usam nossa solução de chatbot do WhatsApp
              </p>
              <Link href="/register">
                <Button className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6">
                  Cadastre sua empresa agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Floating Chat Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-violet-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {/* Chat Modal */}
      {isChatOpen && (
        <div className="fixed bottom-8 right-8 w-96 z-50">
          <Card className="border-0 bg-black/90 backdrop-blur-xl">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-purple-500" />
                  <h3 className="font-semibold text-white">Demonstração do Chat</h3>
                </div>
                <Button variant="ghost" className="text-white hover:bg-white/10" onClick={() => setIsChatOpen(false)}>
                  ✕
                </Button>
              </div>
              <div className="space-y-4 h-[400px] overflow-y-auto mb-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.role === "user" ? "bg-purple-600 text-white" : "bg-white/10 text-white"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={sendMessage} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button type="submit">Enviar</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

