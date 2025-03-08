"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import api from '@/src/services/axiosInstance'
import { QrCode, RefreshCw, Smartphone, Check, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function WhatsAppConnectionPage() {
  const [connectionName, setConnectionName] = useState("")
  const [showQrCode, setShowQrCode] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [qrCodeData, setQrCodeData] = useState("")
  const [status, setStatus] = useState("")
  const empresa_id = 1 // Replace with actual company ID

  const generateQrCode = async () => {
    if (!connectionName.trim()) return

    setIsGenerating(true)
    try {

      const empresa_id = localStorage.getItem('@App:companyId');

      const response = await api.post('http://localhost:9090/api/whatsapp/sessions/init', { empresa_id })
      const qrCode = response.data.qrCode;

      setQrCodeData(qrCode);
      setShowQrCode(true);

      setIsGenerating(false);
      
      checkStatusAndQR()
    } catch (error) {
      console.error('Error initializing WhatsApp:', error)
    }
  }

  const checkStatusAndQR = async () => {
    try {
      const statusResponse = await axios.get(`/api/whatsapp/sessions/status/${empresa_id}`)
      setStatus(statusResponse.data.status)

      if (statusResponse.data.status === 'WAITING_FOR_SCAN') {
        const qrResponse = await axios.get(`/api/whatsapp/sessions/qrcode/${empresa_id}`)
        setQrCodeData(qrResponse.data.qrCode)
        setShowQrCode(true)
        setIsGenerating(false)
      } else if (statusResponse.data.status === 'CONNECTED') {
        setIsConnected(true)
        setShowQrCode(false)
      }
    } catch (error) {
      console.error('Error checking status:', error)
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (showQrCode && !isConnected) {
      interval = setInterval(checkStatusAndQR, 5000)
    }
    return () => clearInterval(interval)
  }, [showQrCode, isConnected])

  const resetConnection = () => {
    setIsConnected(false)
    setShowQrCode(false)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">WhatsApp Connection</h1>
        {isConnected && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 text-green-500">
            <Check className="h-4 w-4" />
            <span className="text-sm font-medium">Connected</span>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Connection Setup */}
        <Card className="border-0 bg-black/40 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-xl text-white">Setup Connection</CardTitle>
            <CardDescription className="text-gray-400">Connect your WhatsApp account to the chatbot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="connection-name" className="text-white">
                Connection Name
              </Label>
              <Input
                id="connection-name"
                placeholder="e.g., Business Support, Sales Bot"
                value={connectionName}
                onChange={(e) => setConnectionName(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                disabled={isConnected}
              />
            </div>

            {!isConnected ? (
              <Button
                onClick={generateQrCode}
                disabled={!connectionName.trim() || isGenerating}
                className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating QR Code...
                  </>
                ) : (
                  <>
                    <QrCode className="mr-2 h-4 w-4" />
                    Generate QR Code
                  </>
                )}
              </Button>
            ) : (
              <Button onClick={resetConnection} variant="destructive" className="w-full">
                <X className="mr-2 h-4 w-4" />
                Disconnect
              </Button>
            )}

            {!isConnected && (
              <Alert className="bg-white/5 border-white/10">
                <AlertDescription className="text-gray-400">
                  After generating the QR code, open WhatsApp on your phone and scan it to connect your account.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* QR Code Display */}
        <Card className="border-0 bg-black/40 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-xl text-white">QR Code</CardTitle>
            <CardDescription className="text-gray-400">Scan with your WhatsApp mobile app</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center min-h-[300px]">
            {showQrCode && qrCodeData ? (
              <div className="space-y-6">
                <div className="relative p-4 bg-white rounded-lg">
                  <img 
                    src={qrCodeData} 
                    alt="WhatsApp QR Code"
                    className="w-64 h-64"
                  />
                </div>
              </div>
            ) : isConnected ? (
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
                  <Check className="h-10 w-10 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white">Successfully Connected</h3>
                  <p className="text-gray-400">
                    Your WhatsApp account "{connectionName}" is now connected to the chatbot.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4 text-gray-400">
                <QrCode className="h-16 w-16 mx-auto opacity-50" />
                <p>Generate a QR code to connect your WhatsApp account</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Connection Instructions */}
      {!isConnected && (
        <Card className="border-0 bg-black/40 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-xl text-white">Connection Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4 text-gray-400 list-decimal pl-5">
              <li>Enter a name for your WhatsApp connection</li>
              <li>Click the "Generate QR Code" button</li>
              <li>Open WhatsApp on your phone</li>
              <li>Tap Menu (or Settings) and select WhatsApp Web</li>
              <li>Point your phone to this screen to scan the QR code</li>
              <li>Wait for the connection to be established</li>
              <li>Once connected, your chatbot will be able to send and receive messages</li>
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

