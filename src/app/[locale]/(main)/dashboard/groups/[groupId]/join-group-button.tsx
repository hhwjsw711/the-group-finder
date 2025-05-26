"use client";

import { joinGroupAction } from "@/app/[locale]/(main)/dashboard/groups/[groupId]/actions";
import { LoaderButton } from "@/components/loader-button";
import { useToast } from "@/components/ui/use-toast";
import { btnIconStyles } from "@/styles/icons";
import { Handshake } from "lucide-react";
import { useParams } from "next/navigation";
import { useServerAction } from "zsa-react";
import { useTranslations } from "next-intl";

export function JoinGroupButton() {
  const t = useTranslations("dashboard.groups.join");
  const { groupId } = useParams<{ groupId: string }>();
  const { toast } = useToast();
  const { execute, status } = useServerAction(joinGroupAction, {
    onSuccess() {
      toast({
        title: t("success"),
        description: t("youJoinedGroup"),
      });
    },
  });

  return (
    <LoaderButton
      size={"sm"}
      isLoading={status === "pending"}
      onClick={() => {
        execute(parseInt(groupId));
      }}
    >
      <Handshake className={btnIconStyles} /> {t("joinGroupButton")}
    </LoaderButton>
  );
}
