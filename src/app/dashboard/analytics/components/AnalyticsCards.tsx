import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, QrCode, Share2, TrendingUp } from "lucide-react"

const analyticsData = [
  {
    title: "Total QRs",
    value: "24",
    change: "+2 in the last month",
    icon: <QrCode className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Total Scans",
    value: "2,573",
    change: "+573 since last month",
    icon: <BarChart3 className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Growth",
    value: "+28.3%",
    change: "Compared to last month",
    icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Conversion Rate",
    value: "4.3%",
    change: "+0.5% since last week",
    icon: <Share2 className="h-4 w-4 text-muted-foreground" />,
  },
];

export function AnalyticsCards() {
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
      {analyticsData.map((data, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{data.title}</CardTitle>
            {data.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.value}</div>
            <p className="text-xs text-muted-foreground">{data.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

