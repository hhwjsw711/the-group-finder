import { Button } from "@/components/ui/button";
import Link from "next/link";
import { env } from "@/env";
import { getUserPlanUseCase } from "@/use-cases/subscriptions";
import { ConfigurationPanel } from "@/components/configuration-panel";
import { assertAuthenticated } from "@/lib/session";
import { getTranslations } from "next-intl/server";

export default async function SubscriptionPage() {
  const user = await assertAuthenticated();
  const t = await getTranslations("dashboard.settings.subscription");
  const currrentPlan = await getUserPlanUseCase(user.id);

  return (
    currrentPlan !== "free" && (
      <ConfigurationPanel title={t("manageSubscription")}>
        <div className="flex flex-col gap-4">
          <div>
            {t("currentPlan", { plan: currrentPlan })}
          </div>
          <div>{t("manageSubscriptionDescription")}</div>
          <Button className="max-w-fit" asChild>
            <Link
              href={env.NEXT_PUBLIC_STRIPE_MANAGE_URL}
              target="_blank"
              rel="noreferrer"
            >
              {t("manageSubscriptionButton")}
            </Link>
          </Button>
        </div>
      </ConfigurationPanel>
    )
  );
}
