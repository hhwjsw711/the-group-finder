"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import * as NProgress from "nprogress";
import { signOutAction } from "./actions";
import { useTranslations } from "next-intl";

export function SignOutItem() {
  const t = useTranslations("header");

  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onSelect={async () => {
        NProgress.start();
        signOutAction().then(() => {
          NProgress.done();
        });
      }}
    >
      <LogOut className="w-4 h-4 mr-2" />
      {t("signOut")}
    </DropdownMenuItem>
  );
}
