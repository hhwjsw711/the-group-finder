import { SignedIn } from "@/components/auth";
import { SignedOut } from "@/components/auth";
import Container from "@/components/container";
import { CheckoutButton } from "@/components/stripe/upgrade-button/checkout-button";
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

function PricingCard({
  title,
  price,
  features,
  hasSubscription,
  priceId,
}: {
  title: string;
  price: string;
  priceId: string;
  hasSubscription: boolean;
  features: string[];
}) {
  const t = useTranslations("pricing");

  return (
    <div className="flex overflow-hidden relative flex-col w-full md:w-[23rem] p-6 text-gray-900 bg-white border border-gray-100 rounded-lg shadow dark:border-gray-800 xl:p-8 dark:bg-transparent dark:text-white">
      <div className="glow absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-gradient-to-br from-blue-600/15 to-green-500/15 blur-3xl filter" />
      <h3 className="text-xl font-semibold">{title}</h3>

      <div className="mr-2 text-4xl font-extrabold mb-8 mt-5">
        ${price} / {t("month")}
      </div>

      <p className="font-light sm:text-lg mb-2 text-left">
        {t("whatThisPlanIncludes")}
      </p>

      <ul role="list" className="mb-8 text-left leading-10">
        {features.map((feature) => (
          <li key={feature} className="flex items-center space-x-3">
            <CheckIcon className="text-green-400 size-5" />
            <span className="dark:text-gray-200">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <SignedIn>
          {hasSubscription ? (
            <Button variant={"default"} asChild>
              <Link href={"/dashboard"}>{t("goToDashboard")}</Link>
            </Button>
          ) : (
            <CheckoutButton priceId={priceId} className="w-full">
              {t("upgradeNow")}
            </CheckoutButton>
          )}
        </SignedIn>

        <SignedOut>
          <Button variant={"default"} asChild className="w-full">
            <Link href={"/sign-in"}>{t("signInToUpgrade")}</Link>
          </Button>
        </SignedOut>
      </div>
    </div>
  );
}

export function PricingSection({
  hasSubscription,
}: {
  hasSubscription: boolean;
}) {
  const t = useTranslations("pricing");

  return (
    <section id="pricing">
      <Container>
        <h2 className="mb-5 text-center text-5xl font-bold text-gray-900 dark:text-white">
          {t("simplePricingForEveryone")}
        </h2>
        <p className="mb-14 max-w-3xl text-center w-full">
          {t("chooseThePlanThatSuitYouBest")}
        </p>

        <div className="flex flex-col md:flex-row justify-center w-full gap-12">
          {/* <PricingCard
            title="Free"
            price="0"
            features={[
              "Complete Next.js Solution",
              "Stripe Integration",
              "User Authentication",
              "Role Based Authorization",
              "User Dashboard",
            ]}
          /> */}

          <PricingCard
            title="Basic"
            price="5"
            hasSubscription={hasSubscription}
            priceId={env.NEXT_PUBLIC_PRICE_ID_BASIC}
            features={[
              t("completeNextJsSolution"),
              t("stripeIntegration"),
              t("userAuthentication"),
              t("roleBasedAuthorization"),
              t("userDashboard"),
            ]}
          />

          <PricingCard
            title="Premium"
            price="10"
            hasSubscription={hasSubscription}
            priceId={env.NEXT_PUBLIC_PRICE_ID_PREMIUM}
            features={[
              t("completeNextJsSolution"),
              t("stripeIntegration"),
              t("userAuthentication"),
              t("roleBasedAuthorization"),
              t("userDashboard"),
            ]}
          />
        </div>
      </Container>
    </section>
  );
}
