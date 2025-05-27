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
import { useState } from "react";
import { useServerAction } from "zsa-react";
import { clearReadNotificationsAction } from "./actions";
import { useToast } from "@/components/ui/use-toast";
import { TrashIcon } from "lucide-react";
import { btnIconStyles, btnStyles } from "@/styles/icons";
import { useTranslations } from "next-intl";

export function ClearReadButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const t = useTranslations("notifications");
  const { execute, isPending } = useServerAction(clearReadNotificationsAction, {
    onSuccess: () => {
      toast({
        title: t("success"),
        description: t("readMessagesCleared"),
      });
      setIsOpen(false);
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className={btnStyles} variant="destructive">
          <TrashIcon className={btnIconStyles} /> {t("clearReadNotifications")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("clearReadNotificationsTitle")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("clearReadNotificationsDescription")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <LoaderButton
            onClick={() => {
              execute();
            }}
            isLoading={isPending}
          >
            {t("clearNotifications")}
          </LoaderButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
