import { BannerUploadForm } from "@/app/[locale]/(main)/dashboard/groups/[groupId]/settings/banner-upload-form";
import { getGroupImageUrl } from "@/app/[locale]/(main)/dashboard/groups/[groupId]/settings/util";
import { GroupVisibilitySwitch } from "@/app/[locale]/(main)/dashboard/groups/[groupId]/settings/visibility-switch";
import { assertAuthenticated } from "@/lib/session";
import { pageTitleStyles } from "@/styles/common";
import { getGroupByIdUseCase } from "@/use-cases/groups";
import Image from "next/image";
import { GroupNameForm } from "./group-name-form";
import { ConfigurationPanel } from "@/components/configuration-panel";
import { GroupDescriptionForm } from "./group-description-form";
import { SocialLinksForm } from "./social-links-form";
import { getTranslations } from "next-intl/server";

export default async function Settings({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;
  const user = await assertAuthenticated();
  const groupIdInt = parseInt(groupId);
  const group = await getGroupByIdUseCase(user, groupIdInt);
  const t = await getTranslations("dashboard.groups.settings");

  if (!group) {
    return <div>{t("groupNotFound")}</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className={`${pageTitleStyles} text-center md:text-left`}>
        {t("groupSettings")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ConfigurationPanel title={t("groupImage")}>
          <div className="flex flex-col gap-8">
            <Image
              src={getGroupImageUrl(group)}
              width={200}
              height={200}
              className="w-full h-[100px] object-cover"
              alt={t("groupImageAlt")}
            />
            <p className="dark:text-gray-400 text-sm">
              {t("groupImageDescription")}
            </p>
            <BannerUploadForm groupId={group.id} />
          </div>
        </ConfigurationPanel>

        <ConfigurationPanel title={t("groupName")}>
          <GroupNameForm groupId={group.id} groupName={group?.name ?? ""} />
        </ConfigurationPanel>

        <ConfigurationPanel title={t("groupVisibility")}>
          <div className="flex flex-col gap-8">
            <p className="dark:text-gray-400 text-sm">
              {t("groupVisibilityDescription")}
            </p>
            <GroupVisibilitySwitch group={group} />
          </div>
        </ConfigurationPanel>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ConfigurationPanel title={t("groupDescription")}>
          <GroupDescriptionForm
            groupId={group.id}
            description={group?.description ?? ""}
          />
        </ConfigurationPanel>

        <ConfigurationPanel title={t("socialLinks")}>
          <SocialLinksForm group={group} />
        </ConfigurationPanel>
      </div>
    </div>
  );
}
