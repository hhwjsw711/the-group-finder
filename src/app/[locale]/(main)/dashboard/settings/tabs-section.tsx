"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabStyles } from "@/styles/common";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export function SettingsTab({ hasSubscription }: { hasSubscription: boolean }) {
  const t = useTranslations("dashboard.settings.tabs");
  const path = usePathname();
  const tabInUrl = path.split("/").pop();

  return (
    <div className={tabStyles}>
      <div className="container mx-auto">
        <Tabs value={tabInUrl} defaultValue={tabInUrl} activationMode="manual">
          <TabsList className="space-x-4 bg-inherit">
            <TabsTrigger asChild value="profile">
              <Link href={`/dashboard/settings/profile`}>{t("profile")}</Link>
            </TabsTrigger>

            <TabsTrigger asChild value="security">
              <Link href={`/dashboard/settings/security`}>{t("security")}</Link>
            </TabsTrigger>

            {hasSubscription && (
              <TabsTrigger asChild value="subscription">
                <Link href={`/dashboard/settings/subscription`}>
                  {t("subscription")}
                </Link>
              </TabsTrigger>
            )}

            <TabsTrigger asChild value="danger">
              <Link href={`/dashboard/settings/danger`}>{t("danger")}</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
