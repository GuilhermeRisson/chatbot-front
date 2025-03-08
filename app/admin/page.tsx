import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Users, Calendar, ArrowUpRight } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Pending Chats",
            value: "12",
            icon: MessageSquare,
            trend: "+2.5%",
          },
          {
            title: "Active Users",
            value: "1,234",
            icon: Users,
            trend: "+12.3%",
          },
          {
            title: "Today's Appointments",
            value: "8",
            icon: Calendar,
            trend: "+5.2%",
          },
          {
            title: "Response Rate",
            value: "95%",
            icon: ArrowUpRight,
            trend: "+1.2%",
          },
        ].map((stat, index) => (
          <Card key={index} className="border-0 bg-white/5 hover:bg-white/10 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
              <stat.icon className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-xs text-green-500">{stat.trend} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pending Chats */}
      <Card className="border-0 bg-black/40 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-xl text-white">Pending Chats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Customer #{i + 1}</h3>
                    <p className="text-sm text-gray-400">Last message: 5m ago</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-500">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

