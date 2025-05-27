"use client";

import { useToast } from "@/components/ui/use-toast";
import { useServerAction } from "zsa-react";
import { followUserAction } from "./actions";
import { UserId } from "@/use-cases/types";
import { LoaderButton } from "@/components/loader-button";
import { UserPlus } from "lucide-react";
import { btnIconStyles, btnStyles } from "@/styles/icons";
import { useTranslations } from "next-intl";

export function FollowButton({ foreignUserId }: { foreignUserId: UserId }) {
  const { toast } = useToast();
  const t = useTranslations("users");

  const { execute, isPending } = useServerAction(followUserAction, {
    onSuccess() {
      toast({
        title: t("followSuccess"),
        description: t("followSuccessDescription"),
      });
    },
    onError() {
      toast({
        title: t("followErrorTitle"),
        variant: "destructive",
        description: t("followErrorDescription"),
      });
    },
  });

  return (
    <LoaderButton
      className={btnStyles}
      onClick={() => execute({ foreignUserId })}
      isLoading={isPending}
    >
      <UserPlus className={btnIconStyles} /> {t("followButton")}
    </LoaderButton>
  );
}
