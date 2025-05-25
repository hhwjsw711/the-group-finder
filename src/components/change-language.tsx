"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/routing";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChangeLanguage() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.replace(pathname, { locale: "en" })}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.replace(pathname, { locale: "zh" })}>
          中文
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.replace(pathname, { locale: "ja" })}>
          日本語
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.replace(pathname, { locale: "ko" })}>
          한국어
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.replace(pathname, { locale: "yue" })}>
          粵語
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
