"use client";
import { Card } from "@/components/ui/card";
import { selectUser } from "@/store/slices/userSlice";
import { Globe, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import CreateFolder from "./CreateFolder";

export default function FolderSection() {
  const userData = useSelector(selectUser);

  const folders = userData?.folders || [];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">My Folders</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,180px)] gap-4">
        {folders.map((folder) => (
          <Card
            key={folder.id}
            className="p-6 flex flex-col items-center justify-between cursor-pointer hover:bg-accent transition-colors group"
          >
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground/25 flex items-center justify-center group-hover:border-primary/50">
              <Globe className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
            </div>
            <span className="text-sm text-muted-foreground group-hover:text-primary capitalize font-bold">
              {folder.name}
            </span>
          </Card>
        ))}
        <CreateFolder>
          <Card className="p-6 flex flex-col items-center justify-between cursor-pointer hover:bg-accent transition-colors group">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground/25 flex items-center justify-center group-hover:border-primary/50">
              <Plus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
            </div>
            <span className="text-sm text-muted-foreground group-hover:text-primary capitalize font-bold">
              New Folder
            </span>
          </Card>
        </CreateFolder>
      </div>
    </div>
  );
}
