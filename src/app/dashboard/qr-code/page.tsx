"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QRCodeService } from "@/core/qrCodes/application/qrCodeService";
import { IQRCode } from "@/core/qrCodes/domain/qrCode";
import { FirebaseQrCodeRepository } from "@/core/qrCodes/infrastructure/FirebaseQrCodeRepository";
import { selectUser } from "@/store/slices/userSlice";
import { useUser } from "@clerk/nextjs";
import { FolderArchive, Link, FileText, Mail, Phone, MapPin, Wifi, Calendar, ShoppingBag, MoreHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { DashboardHeader } from "../components/DashboardHeader";
import { DashboardShell } from "../components/DashboardShell";
import { toast } from "sonner";

const qrCodeService = QRCodeService(FirebaseQrCodeRepository);

const qrCodeTypes: { value: IQRCode["type"]; label: string; icon: React.ElementType }[] = [
  { value: "url", label: "URL", icon: Link },
  { value: "text", label: "Text", icon: FileText },
  { value: "email", label: "Email", icon: Mail },
  { value: "phone", label: "Phone", icon: Phone },
  { value: "location", label: "Location", icon: MapPin },
  { value: "wifi", label: "WiFi", icon: Wifi },
  { value: "event", label: "Event", icon: Calendar },
  { value: "product", label: "Product", icon: ShoppingBag },
  { value: "other", label: "Other", icon: MoreHorizontal },
];

export default function CreateQRCodePage() {
  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IQRCode>();
  const { user } = useUser();
  const userData = useSelector(selectUser);
  const userFolders = userData?.folders || [];

  const onSubmit = async (data: IQRCode) => {
    if (!user) {
      console.error("User not found");
      return;
    }
    try {
      const folderName =
        data.folder === "null"
          ? undefined
          : userFolders.find((folder) => folder.id === data.folder)?.name;
      await qrCodeService.createQRCode({
        ...data,
        userId: user.id,
        folder: folderName,
      });
      reset();
      toast.success("QR Code created successfully");
    } catch (error) {
      console.error("Error creating QR Code:", error);
    }
  };

  return (
    <DashboardShell>
      <DashboardHeader heading="Create New QR Code"></DashboardHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-2xl mx-auto">
        <div>
          <Label>Name:</Label>
          <Input {...register("name", { required: true })} />
          {errors.name && <span>This field is required</span>}
        </div>
        <div>
          <Label>Description:</Label>
          <Input {...register("description")} />
        </div>
        <div>
          <Label>Data:</Label>
          <Input {...register("data", { required: true })} />
          {errors.data && <span>This field is required</span>}
        </div>
        <div>
          <Label>Type:</Label>
          <Select
            {...register("type", { required: true })}
            onValueChange={(value) => {
              setValue("type", value as IQRCode["type"]);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              {qrCodeTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex items-center gap-2">
                    <type.icon className="h-4 w-4" />
                    <span>{type.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.type && <span>This field is required</span>}
        </div>
        <div>
          <label>Image URL:</label>
          <Input {...register("imageUrl")} />
        </div>
        <div>
          <Label>Folder:</Label>
          <Select
            {...register("folder")}
            onValueChange={(value) => {
              setValue("folder", value);
            }}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  userFolders.length > 0
                    ? "Select a folder"
                    : "No folders found"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"null"}>
                <FolderArchive className="w-4 h-4 mr-2" />
                Empty Folder
              </SelectItem>
              {userFolders.map((folder) => (
                <SelectItem key={folder.id} value={folder.id}>
                  <FolderArchive className="w-4 h-4 mr-2" />
                  {folder.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit">Create QR Code</Button>
      </form>
    </DashboardShell>
  );
}
