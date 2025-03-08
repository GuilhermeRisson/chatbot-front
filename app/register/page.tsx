"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { ArrowRight, Building2, Mail, Phone, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import api from '@/src/services/axiosInstance'
import { useAuth } from '@/src/contexts/AuthContext'

export default function RegisterPage() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [generalError, setGeneralError] = useState<string | null>(null)
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
    setErrors({})
    setGeneralError(null)
  
    try {
      const response = await api.post('http://localhost:9090/api/empresa/register-new-enterprise', formData)
  
      if (response.status === 201) {
        console.log('Cadastro realizado com sucesso!')
        const { token } = response.data
        
        if (!token) {
          setGeneralError('Token não recebido do servidor')
          return
        }

        try {
          await signIn({
            email: formData.email,
            password: formData.password,
            token: token
          })
          
          router.push('/admin')
        } catch (loginError: any) {
          console.error('Erro no login:', loginError)
          setGeneralError('Cadastro realizado com sucesso, mas houve um erro ao fazer login automático. Por favor, tente fazer login manualmente.')
        }
      }
    } catch (error: any) {
      // Se chegou aqui, é porque houve erro no cadastro
      if (error.response?.data) {
        const { data } = error.response
        if (data.status === 'error') {
          if (data.campo) {
            setErrors({
              [data.campo]: data.mensagem
            })
          } else if (data.erros) {
            const newErrors: {[key: string]: string} = {}
            data.erros.forEach((err: { campo: string, mensagem: string }) => {
              newErrors[err.campo] = err.mensagem
            })
            setErrors(newErrors)
          } else {
            setGeneralError(data.mensagem || 'Ocorreu um erro ao cadastrar')
          }
        }
      } else {
        setGeneralError('Ocorreu um erro ao processar a requisição')
      }
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
          {generalError && (
            <Alert variant="destructive" className="mb-6 bg-red-500/10 border-red-500/20 text-red-400">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{generalError}</AlertDescription>
            </Alert>
          )}

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
                        className={`bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-purple-500 focus-visible:ring-offset-0 ${
                          errors.nome ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.nome && (
                        <span className="text-sm text-red-500">{errors.nome}</span>
                      )}
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
                        className={`bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-purple-500 focus-visible:ring-offset-0 ${
                          errors.cnpj_cpf ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.cnpj_cpf && (
                        <span className="text-sm text-red-500">{errors.cnpj_cpf}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4">
                  <Link href="/login" className="w-full">
                    <Button type="button"  className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white">
                      Já é usuário ?
                    </Button>
                  </Link>
                    <Button type="button" onClick={() => setStep(2)} className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white">
                        Próximo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>                 

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
                      className={`bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-purple-500 focus-visible:ring-offset-0 ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.email && (
                      <span className="text-sm text-red-500">{errors.email}</span>
                    )}
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
                      className={`bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-purple-500 focus-visible:ring-offset-0 ${
                        errors.telefone ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.telefone && (
                      <span className="text-sm text-red-500">{errors.telefone}</span>
                    )}
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
                      className={`bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-purple-500 focus-visible:ring-offset-0 ${
                        errors.password ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.password && (
                      <span className="text-sm text-red-500">{errors.password}</span>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 border-white/20 bg-white/10 text-white hover:bg-white/20"
                    >
                      Voltar
                    </Button>
                    <Button type="submit" className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white">
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
