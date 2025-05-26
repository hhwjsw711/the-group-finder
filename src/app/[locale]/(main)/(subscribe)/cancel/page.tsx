import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function CancelPage() {
  const t = useTranslations("subscribe.cancel");

  return (
    <>
      <div className="flex flex-col gap-8 items-center pb-24">
        <h1 className="text-4xl mt-24">{t("title")}</h1>

        <p className="text-2xl max-w-xl text-center">
          {t("description")}
        </p>

        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400 py-4">
          <Button variant="secondary" asChild size="lg">
            <Link
              target="_blank"
              href="https://github.com/hhwjsw711/the-group-finder"
            >
              {t("checkoutFreeStarterKit")}
            </Link>
          </Button>
        </p>

        <Button variant="default" asChild size="lg">
          <Link href="/">
            <ChevronLeft className="w-4 h-4 mr-2" /> {t("letLandingPageConvincedYou")}
          </Link>
        </Button>
      </div>
    </>
  );
}
