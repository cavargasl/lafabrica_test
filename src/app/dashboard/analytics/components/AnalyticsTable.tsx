"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QrCode } from "lucide-react";

// Datos de ejemplo - estos vendrían de tu API o base de datos
const topQrCodes = [
  {
    id: "1",
    title: "Company Website",
    scans: 1245,
    conversionRate: "4.8%",
    lastScan: "2 hours ago",
  },
  {
    id: "2",
    title: "Restaurant Menu",
    scans: 583,
    conversionRate: "5.2%",
    lastScan: "4 hours ago",
  },
  {
    id: "3",
    title: "Professional Contact",
    scans: 97,
    conversionRate: "2.1%",
    lastScan: "1 day ago",
  },
  {
    id: "4",
    title: "Summer Promotion",
    scans: 421,
    conversionRate: "8.3%",
    lastScan: "8 hours ago",
  },
  {
    id: "5",
    title: "Social Media Link",
    scans: 185,
    conversionRate: "3.7%",
    lastScan: "12 hours ago",
  },
];

export function AnalyticsTable() {
  return (
    <Card className="min-h-[350px] relative">
      <CardHeader>
        <CardTitle>Most Scanned QRs</CardTitle>
      </CardHeader>
      <CardContent className="absolute top-14 z-40 w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-4">QR</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Scans</TableHead>
              <TableHead className="text-right">Conversion Rate</TableHead>
              <TableHead className="text-right">Last Scan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topQrCodes.map((qr) => (
              <TableRow key={qr.id}>
                <TableCell>
                  <div className="flex items-center justify-center">
                    <div className="h-8 w-8 bg-muted flex items-center justify-center rounded">
                      <QrCode className="h-4 w-4" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{qr.title}</TableCell>
                <TableCell className="text-right">{qr.scans}</TableCell>
                <TableCell className="text-right">
                  {qr.conversionRate}
                </TableCell>
                <TableCell className="text-right">{qr.lastScan}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
