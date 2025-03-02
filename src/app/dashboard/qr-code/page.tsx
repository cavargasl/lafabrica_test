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
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { DashboardHeader } from "../components/DashboardHeader";
import { DashboardShell } from "../components/DashboardShell";

const qrCodeService = QRCodeService(FirebaseQrCodeRepository);

export default function CreateQRCodePage() {
  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IQRCode>();
  const { user } = useUser();

  const onSubmit = async (data: IQRCode) => {
    if (!user) {
      console.error("User not found");
      return;
    }
    try {
      await qrCodeService.createQRCode({
        ...data,
        userId: user.id,
      });
      reset();
    } catch (error) {
      console.error("Error creating QR Code:", error);
    }
  };

  return (
    <DashboardShell>
      <DashboardHeader heading="Create New QR Code"></DashboardHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
              <SelectItem value="url">URL</SelectItem>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="location">Location</SelectItem>
              <SelectItem value="wifi">WiFi</SelectItem>
              <SelectItem value="event">Event</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && <span>This field is required</span>}
        </div>
        <div>
          <label>Image URL:</label>
          <Input {...register("imageUrl")} />
        </div>
        <Button type="submit">Create QR Code</Button>
      </form>
    </DashboardShell>
  );
}
