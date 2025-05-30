"use client";

import { Button } from "@/components/ui/button";
import useMediaQuery from "@/hooks/use-media-query";
import { BookIcon, SearchIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export function HeaderLinks({ isAuthenticated }: { isAuthenticated: boolean }) {
  const t = useTranslations("header");
  const path = usePathname();
  const { isMobile } = useMediaQuery();
  const isLandingPage = path === "/";

  if (isMobile) return null;

  return (
    <>
      {!isLandingPage && isAuthenticated && (
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant={"link"}
            asChild
            className="flex items-center justify-center gap-2"
          >
            <Link href={"/dashboard"}>
              <UsersIcon className="w-4 h-4" /> {t("yourGroups")}
            </Link>
          </Button>

          <Button
            variant={"link"}
            asChild
            className="flex items-center justify-center gap-2"
          >
            <Link href={"/browse"}>
              <SearchIcon className="w-4 h-4" /> {t("browseGroups")}
            </Link>
          </Button>

          <Button
            variant={"link"}
            asChild
            className="flex items-center justify-center gap-2"
          >
            <Link href={"/your-rooms"}>
              <UsersIcon className="w-4 h-4" /> {t("yourRooms")}
            </Link>
          </Button>

          <Button
            variant={"link"}
            asChild
            className="flex items-center justify-center gap-2"
          >
            <Link href={"/browse-rooms"}>
              <SearchIcon className="w-4 h-4" /> {t("browseRooms")}
            </Link>
          </Button>

          {/* <Button
            variant={"link"}
            asChild
            className="flex items-center justify-center gap-2"
          >
            <Link href={"/docs"}>
              <BookIcon className="w-4 h-4" /> {t("apiDocs")}
            </Link>
          </Button> */}
        </div>
      )}

      {(isLandingPage || !isAuthenticated) && (
        <div className="hidden md:flex gap-4">
          <Button variant={"link"} asChild>
            <Link href="/#features">{t("features")}</Link>
          </Button>

          <Button variant={"link"} asChild>
            <Link href="/#pricing">{t("pricing")}</Link>
          </Button>

          <Button variant={"link"} asChild>
            <Link href={"/browse"}>{t("browseGroups")}</Link>
          </Button>

          <Button variant={"link"} asChild>
            <Link href={"/browse-rooms"}>{t("browseRooms")}</Link>
          </Button>
        </div>
      )}
    </>
  );
}
