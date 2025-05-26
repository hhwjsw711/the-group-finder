import { Button } from "@/components/ui/button";
import { pageTitleStyles } from "@/styles/common";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function MagicLinkPage() {
  const t = useTranslations("auth");

  return (
    <div className="py-24 mx-auto max-w-[400px] space-y-6">
      <h1 className={pageTitleStyles}>{t("expiredToken")}</h1>
      <p className="text-xl">
        {t("expiredTokenDescription")}
      </p>

      <Button asChild>
        <Link href="/sign-in">{t("signIn")}</Link>
      </Button>
    </div>
  );
}
