"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabStyles } from "@/styles/common";
import { UserId } from "@/use-cases/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export function ProfileTabs({ userId }: { userId: UserId }) {
  const t = useTranslations("users.tabs");
  const path = usePathname();
  const tabInUrl = path.includes("/posts") ? "posts" : path.split("/").pop();

  return (
    <div className={tabStyles}>
      <div className="container mx-auto">
        <Tabs value={tabInUrl} defaultValue={tabInUrl} activationMode="manual">
          <TabsList className="flex-wrap space-x-4 bg-inherit h-fit">
            <TabsTrigger asChild value="info">
              <Link href={`/users/${userId}/info`}>{t("bio")}</Link>
            </TabsTrigger>

            <TabsTrigger asChild value="posts">
              <Link href={`/users/${userId}/posts`}>{t("recentPosts")}</Link>
            </TabsTrigger>

            <TabsTrigger asChild value="groups">
              <Link href={`/users/${userId}/groups`}>{t("groups")}</Link>
            </TabsTrigger>

            <TabsTrigger asChild value="followers">
              <Link href={`/users/${userId}/followers`}>{t("followers")}</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
