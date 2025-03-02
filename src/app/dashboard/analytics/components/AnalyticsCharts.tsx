"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AnalyticsCharts() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_.8fr] grid-cols-1">
      <Card>
        <CardHeader>
          <CardTitle>Scan Activity</CardTitle>
          <CardDescription>Number of scans in the last month</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[260px] w-full bg-muted flex items-center justify-center rounded">
            <span className="text-muted-foreground">Activity line chart</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>QR Code Distribution</CardTitle>
          <CardDescription>By category and usage</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="category">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="category">Category</TabsTrigger>
              <TabsTrigger value="device">Device</TabsTrigger>
            </TabsList>
            <TabsContent value="category" className="mt-2">
              <div className="h-[200px] w-full bg-muted flex items-center justify-center rounded">
                <span className="text-muted-foreground">Category pie chart</span>
              </div>
            </TabsContent>
            <TabsContent value="device" className="mt-2">
              <div className="h-[200px] w-full bg-muted flex items-center justify-center rounded">
                <span className="text-muted-foreground">Device bar chart</span>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

