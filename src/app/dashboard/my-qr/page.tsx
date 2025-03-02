import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FolderPlus, Plus } from "lucide-react";
import { DashboardHeader } from "../components/DashboardHeader";
import { DashboardShell } from "../components/DashboardShell";
import FolderSection from "./components/FolderSection";
import QRList from "./components/QRList";

export default function MyQRPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="My QR Codes">
        <div className="flex gap-2">
          <Button variant="outline">
            <FolderPlus className="md:mr-2 h-4 w-4" />
            <span className="hidden md:block">New Folder</span>
          </Button>
          <Button>
            <Plus className="md:mr-2 h-4 w-4" />
            <span className="hidden md:block">Create New QR Code</span>
          </Button>
        </div>
      </DashboardHeader>

      <div className="space-y-8">
        <FolderSection />
      </div>

      {/* Filters Section */}
      <div className="grid gap-4 md:grid-cols-5">
        <div className="space-y-2">
          <label className="text-sm font-medium">My QR Codes</label>
          <Input type="search" placeholder="Search..." />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">QR Code Status</label>
          <Select defaultValue="active">
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">QR Code Type</label>
          <Select defaultValue="selected">
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="selected">Selected (13)</SelectItem>
              <SelectItem value="all">All Types</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Sort by</label>
          <Select defaultValue="recent">
            <SelectTrigger>
              <SelectValue placeholder="Select order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">More recent</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Number of QRs per page</label>
          <Select defaultValue="10">
            <SelectTrigger>
              <SelectValue placeholder="Select amount" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Select All */}
      <div className="flex items-center space-x-2">
        <Checkbox id="selectAll" />
        <label
          htmlFor="selectAll"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Select All
        </label>
      </div>

      {/* QR Codes List */}
      <QRList />

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing 1 - 1 out of 1 QRs
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-primary text-primary-foreground"
          >
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </DashboardShell>
  );
}
