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
import { Textarea } from "@/components/ui/textarea";
import { QRCodeService } from "@/core/qrCodes/application/qrCodeService";
import { IQRCode } from "@/core/qrCodes/domain/qrCode";
import { FirebaseQrCodeRepository } from "@/core/qrCodes/infrastructure/FirebaseQrCodeRepository";
import { selectUser } from "@/store/slices/userSlice";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  FileText,
  FolderArchive,
  Link,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  ShoppingBag,
  Wifi,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";
import { DashboardHeader } from "../components/DashboardHeader";
import { DashboardShell } from "../components/DashboardShell";

const qrCodeService = QRCodeService(FirebaseQrCodeRepository);

const qrCodeTypes: {
  value: IQRCode["type"];
  label: string;
  icon: React.ElementType;
}[] = [
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

const qrCodeSchema = z.object({
  name: z
    .string()
    .min(1, "The name is required")
    .max(50, "The name cannot exceed 50 characters"),
  description: z
    .string()
    .min(1, "The description is required")
    .max(200, "The description cannot exceed 200 characters"),
  data: z
    .string()
    .min(1, "The data is required")
    .max(500, "The data cannot exceed 500 characters"),
  type: z.enum(
    [
      "text",
      "url",
      "email",
      "phone",
      "location",
      "wifi",
      "event",
      "product",
      "other",
    ],
    {
      errorMap: () => ({ message: "Please select a valid type" }),
    }
  ),
  imageUrl: z
    .union([z.string().url("The image URL is invalid"), z.string().length(0)])
    .optional(),
  folder: z.string().optional(),
});

type QRCodeFormValues = z.infer<typeof qrCodeSchema>;

export default function CreateQRCodePage() {
  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QRCodeFormValues>({
    resolver: zodResolver(qrCodeSchema),
    defaultValues: {
      name: "",
      type: undefined,
      description: "",
      data: "",
      imageUrl: "",
      folder: "null",
    },
  });
  const { user } = useUser();
  const userData = useSelector(selectUser);
  const userFolders = userData?.folders || [];

  const onSubmit = async (data: QRCodeFormValues) => {
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
        scans: 0,
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-2xl mx-auto"
      >
        <div className="flex flex-col gap-1">
          <Label>Name:</Label>
          <Input {...register("name", { required: true })} />
          {errors.name && (
            <span className="text-destructive text-sm">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label>Description:</Label>
          <Input {...register("description")} />
          {errors.description && (
            <span className="text-destructive text-sm">
              {errors.description.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label>Data:</Label>
          <Textarea {...register("data", { required: true })} />
          {errors.data && (
            <span className="text-destructive text-sm">
              {errors.data.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
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
          {errors.type && (
            <span className="text-destructive text-sm">
              {errors.type.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label>Image URL:</label>
          <Input {...register("imageUrl")} />
          {errors.imageUrl && (
            <span className="text-destructive text-sm">
              {errors.imageUrl.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label>Folder:</Label>
          <Select
            {...register("folder")}
            onValueChange={(value) => {
              setValue("folder", value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={userFolders.length > 0 ? "Select a folder" : "Without folder"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"null"}>
                <FolderArchive className="w-4 h-4 mr-2" />
                Without folder
              </SelectItem>
              {userFolders.map((folder) => (
                <SelectItem key={folder.id} value={folder.id}>
                  <FolderArchive className="w-4 h-4 mr-2" />
                  {folder.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.folder && (
            <span className="text-destructive text-sm">
              {errors.folder.message}
            </span>
          )}
        </div>

        <Button type="submit">Create QR Code</Button>
      </form>
    </DashboardShell>
  );
}
