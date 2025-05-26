import { assertAuthenticated } from "@/lib/session";
import { pageTitleStyles } from "@/styles/common";
import { getGroupByIdUseCase } from "@/use-cases/groups";
import { ConfigurationPanel } from "@/components/configuration-panel";
import { DeleteGroupButton } from "./delete-group-button";
import { getTranslations } from "next-intl/server";

export default async function DangerTab({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const t = await getTranslations("dashboard.danger");
  const { groupId } = await params;
  const groupIdInt = parseInt(groupId);
  const user = await assertAuthenticated();
  const group = await getGroupByIdUseCase(user, groupIdInt);

  if (!group) {
    return <div>{t("groupNotFound")}</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className={pageTitleStyles}>{t("title")}</h1>

      <div className="grid grid-cols-2 gap-8">
        <ConfigurationPanel
          variant="destructive"
          title={t("deleteGroupTitle")}
        >
          <div className="flex flex-col gap-8">
            <p className="dark:text-gray-400">
              {t("deleteGroupDescription")}
            </p>
            <DeleteGroupButton />
          </div>
        </ConfigurationPanel>
      </div>
    </div>
  );
}
