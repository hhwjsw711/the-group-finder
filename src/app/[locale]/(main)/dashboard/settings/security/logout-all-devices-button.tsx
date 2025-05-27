"use client";

import { LoaderButton } from "@/components/loader-button";
import { btnIconStyles, btnStyles } from "@/styles/icons";
import { LogOut } from "lucide-react";
import { useServerAction } from "zsa-react";
import { invalidateUserSessionsAction } from "./actions";
import { useTranslations } from "next-intl";

export function LogoutAllDevicesButton() {
  const { execute, isPending } = useServerAction(invalidateUserSessionsAction);
  const t = useTranslations("dashboard.settings.security");

  return (
    <LoaderButton
      className={btnStyles}
      onClick={() => {
        execute();
      }}
      isLoading={isPending}
    >
      <LogOut className={btnIconStyles} />
      {t("logoutAllDevices")}
    </LoaderButton>
  );
}
