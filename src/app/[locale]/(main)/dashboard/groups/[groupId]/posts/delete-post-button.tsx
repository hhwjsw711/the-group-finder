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
import { DoorOpen, Trash } from "lucide-react";
import { useState } from "react";
import { useServerAction } from "zsa-react";
import { cn } from "@/lib/utils";
import { deletePostAction } from "./actions";
import { useTranslations } from "next-intl";

export function DeletePostButton({ postId }: { postId: number }) {
  const { toast } = useToast();
  const t = useTranslations("dashboard.groups.posts");
  const [isOpen, setIsOpen] = useState(false);
  const { execute, isPending } = useServerAction(deletePostAction, {
    onSuccess() {
      toast({
        title: t("success"),
        description: t("postDeletedSuccessfully"),
      });
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} className={cn(btnStyles, "w-fit")}>
          <Trash className={btnIconStyles} /> {t("deletePostButton")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("deletePost")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("deletePostDescription")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <LoaderButton
            isLoading={isPending}
            onClick={() => {
              execute({ postId });
            }}
          >
            {t("deletePostButton")}
          </LoaderButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
