"use client";

import { useToast } from "@/components/ui/use-toast";
import { useServerAction } from "zsa-react";
import { unfollowUserAction } from "./actions";
import { UserId } from "@/use-cases/types";
import { LoaderButton } from "@/components/loader-button";
import { UserMinus } from "lucide-react";
import { btnIconStyles, btnStyles } from "@/styles/icons";
import { useTranslations } from "next-intl";

export function UnfollowButton({ foreignUserId }: { foreignUserId: UserId }) {
  const { toast } = useToast();
  const t = useTranslations("users");

  const { execute, isPending } = useServerAction(unfollowUserAction, {
    onSuccess() {
      toast({
        title: t("unfollowSuccess"),
        description: t("unfollowSuccessDescription"),
      });
    },
    onError() {
      toast({
        title: t("unfollowErrorTitle"),
        variant: "destructive",
        description: t("unfollowErrorDescription"),
      });
    },
  });

  return (
    <LoaderButton
      className={btnStyles}
      onClick={() => execute({ foreignUserId })}
      isLoading={isPending}
      variant={"destructive"}
    >
      <UserMinus className={btnIconStyles} /> {t("unfollowButton")}
    </LoaderButton>
  );
}
