import { ConfigurationPanel } from "@/components/configuration-panel";
import { DeleteAccountButton } from "./delete-account-button";
import { getTranslations } from "next-intl/server";

export default async function DangerPage() {
  const t = await getTranslations("dashboard.settings.danger");
  return (
    <ConfigurationPanel variant="destructive" title={t("deleteAccount")}>
      <div className="flex flex-col gap-4">
        <div>{t("deleteAccountDescription")}</div>
        <DeleteAccountButton />
      </div>
    </ConfigurationPanel>
  );
}
