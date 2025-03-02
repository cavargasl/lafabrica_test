"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserDataService } from "@/core/userData/application/userDataService";
import { FirestoreUserDataRepository } from "@/core/userData/infrastructure/FirestoreUserDataRepository";
import { selectUser, setUser } from "@/store/slices/userSlice";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface CreateFolderProps {
  children: React.ReactNode;
}

const folderSchema = z.object({
  folderName: z.string()
    .min(1, "The folder name is required")
    .max(50, "The folder name cannot exceed 50 characters")
    .refine(name => /^[a-zA-Z0-9\s-_]+$/.test(name), {
      message: "Only letters, numbers, spaces, hyphens and underscores are allowed"
    })
});

type FormValues = z.infer<typeof folderSchema>;

export default function CreateFolder({ children }: CreateFolderProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(folderSchema)
  });
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  async function onSubmit(data: FormValues) {
    
    if (!user?.userId) {
      return toast.error("User not found");
    }

    setLoading(true);
    const userDataService = UserDataService(FirestoreUserDataRepository);

    try {
      const newFolder = { id: nanoid(), name: data.folderName };
      await userDataService.updateUserData({
        userId: user.userId,
        userData: {
          folders: [...user.folders, newFolder],
        },
      });
      dispatch(setUser({ ...user, folders: [...user.folders, newFolder] }));
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating folder", error);
      toast.error("Error creating folder");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogDescription>
            Create a new folder to organize your QR codes.
          </DialogDescription>
        </DialogHeader>
        <form>
        <div className="flex flex-col gap-2">
          <Label htmlFor="folderName">Folder Name</Label>
          <Input
            id="folderName"
            className="col-span-3"
            {...register("folderName", { required: true })}
          />
          {errors.folderName && (
            <p className="text-destructive">{errors.folderName.message}</p>
          )}
        </div>
        </form>
        <DialogFooter>
          <Button onClick={handleSubmit(onSubmit)} disabled={loading}>
            {loading ? "Creating..." : "Create Folder"}
          </Button>
        </DialogFooter>
      </DialogContent>
      
    </Dialog>
  );
}
