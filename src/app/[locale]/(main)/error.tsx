"use client";

import { AUTHENTICATION_ERROR_MESSAGE } from "@/app/[locale]/(main)/util";
import { Button } from "@/components/ui/button";
import { pageTitleStyles } from "@/styles/common";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const t = useTranslations("error");
  const isAuthenticationError = error.message.includes(
    AUTHENTICATION_ERROR_MESSAGE
  );

  return (
    <div className="container mx-auto py-12 min-h-screen space-y-8">
      {isAuthenticationError ? (
        <>
          <h1 className={pageTitleStyles}>{t("authenticationErrorTitle")}</h1>
          <p className="text-lg">{t("authenticationErrorDescription")}</p>

          <Button asChild>
            <Link href="/sign-in">{t("signIn")}</Link>
          </Button>
        </>
      ) : (
        <>
          <h1 className={pageTitleStyles}>{t("somethingWentWrong")}</h1>
          <p className="text-lg">{error.message}</p>
        </>
      )}
    </div>
  );
}
