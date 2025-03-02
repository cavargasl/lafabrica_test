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
import { IQRCode } from "@/core/qrCodes/domain/qrCode";
import { formatDate } from "@/lib/utils";
import {
  Calendar,
  Copy,
  Download,
  Edit2,
  ExternalLink,
  FileText,
  Link as LinkIcon,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  QrCode,
  ShoppingBag,
  Wifi,
} from "lucide-react";
import Link from "next/link";

interface QRListProps {
  qrCodes: IQRCode[];
}
export default function QRList({ qrCodes }: QRListProps) {
  return (
    <div className="space-y-4">
      {qrCodes.map((qr) => (
        <div
          key={qr.id}
          className="flex flex-col md:flex-row md:items-start items-center gap-4 p-4 border rounded-lg justify-center"
        >
          <Checkbox />
          <div className="h-24 w-24 lg:h-32 lg:w-32 bg-muted rounded-lg flex items-center justify-center">
            <QrCode className="h-16 w-16 text-muted-foreground" />
          </div>
          <div className="w-full">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {getQRTypeIcon(qr.type)}
                  <span className="text-xs font-medium uppercase">
                    {qr.type}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold capitalize">{qr.name}</h3>
                  <Button variant="outline" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Created: {formatDate(qr.createdAt)}</p>
                  <p>Modified: {formatDate(qr.updatedAt)}</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-sm text-muted-foreground">Scans</div>
                <div className="text-center bg-blue-300 rounded-full p-2 w-12 h-12 flex items-center justify-center">
                  <div className="text-2xl font-bold">{qr.scans}</div>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  {qr.folder && qr.folder.trim() !== "" ? (
                    <span className="text-muted-foreground capitalize">
                      {qr.folder}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">No folder</span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Link
                      href={qr.data}
                      className="text-sm text-primary hover:underline truncate max-w-md"
                    >
                      {qr.data}
                    </Link>
                    <Button variant="outline" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex items-center gap-2 mt-2 sm:mt-0 justify-center md:justify-start">
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
      ))}
    </div>
  );
}

const getQRTypeIcon = (type: IQRCode["type"]) => {
  const iconMap: Record<IQRCode["type"], React.ReactNode> = {
    url: <LinkIcon className="h-4 w-4" />,
    text: <FileText className="h-4 w-4" />,
    email: <Mail className="h-4 w-4" />,
    phone: <Phone className="h-4 w-4" />,
    location: <MapPin className="h-4 w-4" />,
    wifi: <Wifi className="h-4 w-4" />,
    event: <Calendar className="h-4 w-4" />,
    product: <ShoppingBag className="h-4 w-4" />,
    other: <MoreHorizontal className="h-4 w-4" />,
  };

  return iconMap[type] || <MoreHorizontal className="h-4 w-4" />;
};
