import { Card } from '@/components/ui/card'
import { Plus, Globe } from 'lucide-react'
import React from 'react'

const folders = [
  { id: 1, name: "Work" },
  { id: 2, name: "Personal" },
];

export default function FolderSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">My Folders</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,180px)] gap-4">
        {folders.map((folder) => (
          <Card key={folder.id} className="p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-accent transition-colors group">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground/25 flex items-center justify-center group-hover:border-primary/50">
              <Globe className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
            </div>
            <span className="mt-2 text-sm text-muted-foreground group-hover:text-primary">{folder.name}</span>
          </Card>
        ))}
        <Card className="p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-accent transition-colors group">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground/25 flex items-center justify-center group-hover:border-primary/50">
            <Plus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
          </div>
          <span className="mt-2 text-sm text-muted-foreground group-hover:text-primary">New Folder</span>
        </Card>
      </div>
    </div>
  )
}
