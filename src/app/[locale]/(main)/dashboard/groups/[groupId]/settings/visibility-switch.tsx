"use client";

import { toggleGroupVisibilityAction } from "@/app/[locale]/(main)/dashboard/groups/[groupId]/settings/actions";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Group } from "@/db/schema";
import { useServerAction } from "zsa-react";
import { useTranslations } from "next-intl";

export function GroupVisibilitySwitch({ group }: { group: Group }) {
  const { toast } = useToast();
  const t = useTranslations("dashboard.groups.settings");
  const { execute } = useServerAction(toggleGroupVisibilityAction, {
    onSuccess() {
      toast({
        title: t("updateSuccessful"),
        description: t("groupVisibilityUpdated"),
      });
    },
    onError({ err }) {
      toast({
        title: t("somethingWentWrong"),
        description: err.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="flex items-center space-x-2">
      <Switch
        defaultChecked={group.isPublic}
        onCheckedChange={() => {
          execute(group.id);
        }}
        id="visibility"
      />
      <Label htmlFor="visibility">{t("isGroupPublic")}</Label>
    </div>
  );
}
