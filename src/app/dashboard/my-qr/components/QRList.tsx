import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Copy,
  Download,
  Edit2,
  ExternalLink,
  Globe,
  MoreHorizontal,
  QrCode,
} from "lucide-react";

const qrCodes = [
  {
    id: 1,
    type: "WEBSITE",
    title: "Portfolio",
    created: "Mar 1, 2025",
    modified: "Mar 2, 2025",
    scans: 0,
    urls: [
      "https://qrweb.co/ox9u",
      "https://portfolio-camilovargas.vercel.app",
    ],
    folder: null,
  },
];

export default function QRList() {
  return (
    <div className="space-y-4">
      {qrCodes.map((qr) => (
        <div
          key={qr.id}
          className="flex flex-col md:flex-row md:items-start items-center gap-4 p-4 border rounded-lg justify-center"
        >
          <Checkbox />
          <div className="h-24 w-24 bg-muted rounded-lg flex items-center justify-center">
            <QrCode className="h-16 w-16 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0 justify-center">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-500" />
                  <span className="text-xs font-medium text-blue-500">
                    {qr.type}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{qr.title}</h3>
                  <button className="hover:text-primary">
                    <Edit2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Created: {qr.created}</p>
                  <p>Modified: {qr.modified}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="text-center">
                  <div className="text-2xl font-bold">{qr.scans}</div>
                  <div className="text-sm text-muted-foreground">Scans</div>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">No folder</span>
                </div>
                <div className="flex flex-col gap-1">
                  {qr.urls.map((url, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <a
                        href={url}
                        className="text-sm text-primary hover:underline truncate max-w-md"
                      >
                        {url}
                      </a>
                      <button className="hover:text-primary">
                        <Copy className="h-4 w-4" />
                      </button>
                      <button className="hover:text-primary">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline">Detail</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
