"use client";

import { Button } from "@/components/ui/button";
import { pageTitleStyles } from "@/styles/common";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function SignedOutPage() {
  const router = useRouter();
  const t = useTranslations("signedOut");
  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <div className="py-24 mx-auto max-w-[400px] space-y-6">
      <h1 className={pageTitleStyles}>{t("success")}</h1>
      <p className="text-xl">{t("successDescription")}</p>

      <Button asChild>
        <Link href="/sign-in">{t("signIn")}</Link>
      </Button>
    </div>
  );
}
