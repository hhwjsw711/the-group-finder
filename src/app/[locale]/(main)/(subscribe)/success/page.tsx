import Confetti from "@/components/confetti";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function SuccessPage() {
  const t = useTranslations("subscribe.success");

  return (
    <>
      <div className="flex flex-col gap-8 items-center pb-24">
        <h1 className="text-4xl mt-24">{t("title")}</h1>

        <Confetti />

        <p>{t("description")}</p>

        <Button asChild>
          <Link href={"/dashboard"}>{t("viewDashboard")}</Link>
        </Button>
      </div>
    </>
  );
}
