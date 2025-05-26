"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("dashboard.groups.notFound");
  const { groupId } = useParams();

  return (
    <div>
      <Image
        src="/empty-state/no-data.svg"
        width="200"
        height="200"
        alt={t("noImageAlt")}
      ></Image>
      <h2>{t("title")}</h2>
      <Button asChild>
        <Link href={`/dashboard/groups/${groupId}/info`}>{t("viewGroupInfo")}</Link>
      </Button>
    </div>
  );
}
