import { QrCode } from "lucide-react";
import Link from "next/link";

interface LogoProps {
  showText?: boolean;
}

export default function Logo({ showText = true }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <QrCode className="mr-2 h-6 w-6" />
      {showText && <span className="font-bold hidden sm:block">QR Code Manager</span>}
    </Link>
  );
}