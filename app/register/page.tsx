"use client"

import { useState } from "react"
import { ArrowRight, Building2, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import api from '@/src/services/axiosInstance'

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    nome: "",
    cnpj_cpf: "",
    email: "",
    telefone: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [id]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  
    try {

      const response = await api.post('http://localhost:9090/api/empresa/register-new-enterprise', formData)
  
      if (response.status === 200) {
        console.log('Cadastro realizado com sucesso!')
      } else {
        console.error('Erro ao cadastrar')
      }
    } catch (error) {
      console.error('Erro na requisição:', error)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-0 bg-black/40 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-transparent to-purple-600/10 animate-pulse" />

        <CardHeader className="space-y-1 pt-6">
          <CardTitle className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            Registre sua empresa
          </CardTitle>
          <CardDescription className="text-gray-400">Crie uma conta para gerenciar seu chatbot do WhatsApp</CardDescription>
        </CardHeader>

        <CardContent className="relative">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {step === 1 ? (
                <>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome" className="text-white/90">
                        Nome da Empresa
                      </Label>
                      <Input
                        id="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-purple-500 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cnpj_cpf" className="text-white/90">
                        CNPJ/CPF
                      </Label>
                      <Input
                        id="cnpj_cpf"
                        value={formData.cnpj_cpf}
                        onChange={handleChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-purple-500 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white"
                  >
                    Próximo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/90">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-purple-500 focus-visible:ring-offset-0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefone" className="text-white/90">
                      Celular
                    </Label>
                    <Input
                      id="telefone"
                      type="tel"
                      value={formData.telefone}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-purple-500 focus-visible:ring-offset-0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white/90">
                      Senha
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-purple-500 focus-visible:ring-offset-0"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 border-white/20 bg-white/10 text-white hover:bg-white/20"
                    >
                      Voltar
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white"
                    >
                      Cadastrar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
