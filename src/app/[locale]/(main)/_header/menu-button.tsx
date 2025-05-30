"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookIcon, MenuIcon, SearchIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export function MenuButton() {
  const path = usePathname();
  const isLandingPage = path === "/";
  const t = useTranslations("header");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MenuIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2">
        {!isLandingPage && (
          <>
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard"
                className="flex gap-2 items-center cursor-pointer"
              >
                <UsersIcon className="w-4 h-4" /> {t("yourGroups")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/browse"
                className="flex gap-2 items-center cursor-pointer"
              >
                <SearchIcon className="w-4 h-4" /> {t("browseGroups")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/your-rooms"
                className="flex gap-2 items-center cursor-pointer"
              >
                <UsersIcon className="w-4 h-4" /> {t("yourRooms")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/browse-rooms"
                className="flex gap-2 items-center cursor-pointer"
              >
                <SearchIcon className="w-4 h-4" /> {t("browseRooms")}
              </Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem asChild>
              <Link
                href="/docs"
                className="flex gap-2 items-center cursor-pointer"
              >
                <BookIcon className="w-4 h-4" /> {t("apiDocs")}
              </Link>
            </DropdownMenuItem> */}
          </>
        )}
        {isLandingPage && (
          <>
            <DropdownMenuItem asChild>
              <Link
                href="/#features"
                className="flex gap-2 items-center cursor-pointer"
              >
                {t("features")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/#pricing"
                className="flex gap-2 items-center cursor-pointer"
              >
                {t("pricing")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/browse"
                className="flex gap-2 items-center cursor-pointer"
              >
                <SearchIcon className="w-4 h-4" /> {t("browseGroups")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/browse-rooms"
                className="flex gap-2 items-center cursor-pointer"
              >
                <SearchIcon className="w-4 h-4" /> {t("browseRooms")}
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
