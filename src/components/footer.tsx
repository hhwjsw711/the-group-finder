import { applicationName } from "@/app-config";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { ChangeLanguage } from "./change-language";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <>
      <footer className="border-t bg-gray-100 dark:bg-background">
        <div className="max-w-screen-xl p-4 py-6 mx-auto lg:py-16 md:p-8 lg:p-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-3">
            <div>
              <h3 className="mb-6 text-sm md:text-base lg:text-2xl font-semibold text-gray-900 uppercase dark:text-white">
                {applicationName}
              </h3>
            </div>
            <div>
              <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                {t("helpCenter")}
              </h3>
              <ul className="text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                  <a
                    href="https://x.com/hhwjsw711"
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("twitter")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                {t("legal")}
              </h3>
              <ul className="text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                  <Link href="/privacy" className="hover:underline">
                    {t("privacyPolicy")}
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/terms-of-service" className="hover:underline">
                    {t("termsOfService")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <ModeToggle />
            <ChangeLanguage />
          </div>
        </div>
      </footer>
      <footer className="py-8 px-5 border-t">
        <div className="text-center">
          <span className="block text-sm text-center text-gray-500 dark:text-gray-400">
            © 2025 <Link href="/">{applicationName}</Link>. {t("allRightsReserved")}
          </span>
        </div>
      </footer>
    </>
  );
}
