"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, MessageSquare, Calendar, Settings, Users, BarChart, ChevronLeft, Menu,QrCode } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const menuItems = [
  {
    title: "Painel",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Chats",
    href: "/admin/chats",
    icon: MessageSquare,
  },
  {
    title: "Agenda",
    href: "/admin/appointments",
    icon: Calendar,
  },
  // {
  //   title: "Customers",
  //   href: "/admin/customers",
  //   icon: Users,
  // },
  // {
  //   title: "Analytics",
  //   href: "/admin/analytics",
  //   icon: BarChart,
  // },
  {
    title: "Connection",
    href: "/admin/connections",
    icon: QrCode,
  },
  {
    title: "Configuração",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-black/40 backdrop-blur-xl border-r border-white/10 transition-all duration-300",
          collapsed ? "w-16" : "w-64",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          {!collapsed && <span className="text-xl font-bold text-white">Admin Panel</span>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-white hover:bg-white/10"
          >
            {collapsed ? <Menu /> : <ChevronLeft />}
          </Button>
        </div>
        <nav className="p-2 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors",
                pathname === item.href && "text-white bg-white/10",
              )}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={cn("transition-all duration-300", collapsed ? "ml-16" : "ml-64")}>
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}

