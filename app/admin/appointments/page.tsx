"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Clock, CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>("")

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      title: "Client Meeting",
      time: "10:00 AM",
      customer: "John Doe",
      status: "confirmed",
    },
    {
      id: 2,
      title: "Product Demo",
      time: "2:00 PM",
      customer: "Jane Smith",
      status: "pending",
    },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Appointments</h1>

      <div className="grid lg:grid-cols-[300px,1fr] gap-8">
        {/* Calendar Card */}
        <Card className="border-0 bg-black/40 backdrop-blur-xl h-fit">
          <CardContent className="p-4">
            <Calendar mode="single" selected={date} onSelect={setDate} className="text-white" />
          </CardContent>
        </Card>

        {/* Appointments List */}
        <Card className="border-0 bg-black/40 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl text-white">
              {date?.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">Add Appointment</Button>
              </DialogTrigger>
              <DialogContent className="bg-black/90 backdrop-blur-xl border-white/10">
                <DialogHeader>
                  <DialogTitle className="text-white">Schedule New Appointment</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">
                      Title
                    </Label>
                    <Input
                      id="title"
                      placeholder="Enter appointment title"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-white">
                        Date
                      </Label>
                      <div className="relative">
                        <Input id="date" type="date" className="bg-white/10 border-white/20 text-white" />
                        <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-white">
                        Time
                      </Label>
                      <div className="relative">
                        <Input
                          id="time"
                          type="time"
                          className="bg-white/10 border-white/20 text-white"
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                        />
                        <Clock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer" className="text-white">
                      Customer
                    </Label>
                    <Input
                      id="customer"
                      placeholder="Enter customer name"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Schedule Appointment</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{appointment.title}</h3>
                      <p className="text-sm text-gray-400">
                        {appointment.time} - {appointment.customer}
                      </p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      appointment.status === "confirmed"
                        ? "bg-green-500/20 text-green-500"
                        : "bg-yellow-500/20 text-yellow-500",
                    )}
                  >
                    {appointment.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

