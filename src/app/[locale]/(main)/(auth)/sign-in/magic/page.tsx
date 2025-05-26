import { pageTitleStyles } from "@/styles/common";
import { useTranslations } from "next-intl";

export default function MagicLinkPage() {
  const t = useTranslations("auth");

  return (
    <div className="py-24 mx-auto max-w-[400px] space-y-6">
      <h1 className={pageTitleStyles}>{t("checkYourEmail")}</h1>
      <p className="text-xl">
        {t("magicLinkSentDescription")}
      </p>
    </div>
  );
}
