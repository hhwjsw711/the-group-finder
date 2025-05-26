"use client";

import { LoaderButton } from "@/components/loader-button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { btnIconStyles, btnStyles } from "@/styles/icons";
import { DoorOpen } from "lucide-react";
import { useState } from "react";
import { useServerAction } from "zsa-react";
import { deleteGroupAction } from "./actions";
import { useGroupIdParam } from "../utils";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function DeleteGroupButton() {
  const t = useTranslations("dashboard.danger");
  const groupId = useGroupIdParam();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const { execute, isPending } = useServerAction(deleteGroupAction, {
    onSuccess() {
      toast({
        title: t("success"),
        description: t("youLeftGroup"),
      });
    },
    onError() {
      toast({
        title: t("error"),
        variant: "destructive",
        description: t("somethingWentWrongDeleteGroup"),
      });
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} className={cn(btnStyles, "w-fit")}>
          <DoorOpen className={btnIconStyles} /> {t("deleteGroupButton")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("deleteGroupConfirmTitle")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("deleteGroupConfirmDescription")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <LoaderButton
            isLoading={isPending}
            onClick={() => {
              execute({ groupId });
            }}
          >
            {t("deleteGroupButton")}
          </LoaderButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
