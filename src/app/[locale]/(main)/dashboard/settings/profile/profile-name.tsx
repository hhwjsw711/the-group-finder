import { ConfigurationPanel } from "@/components/configuration-panel";
import { ProfileNameForm } from "./profile-name-form";
import { getCurrentUser } from "@/lib/session";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserProfileLoader } from "./page";
import { getTranslations } from "next-intl/server";

export async function ProfileName() {
  const t = await getTranslations("dashboard.settings.profile");
  return (
    <ConfigurationPanel title={t("displayName")}>
      <Suspense fallback={<Skeleton className="w-full h-[200px] rounded" />}>
        <ProfileNameWrapper />
      </Suspense>
    </ConfigurationPanel>
  );
}

async function ProfileNameWrapper() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const profile = await getUserProfileLoader(user.id);

  return <ProfileNameForm profileName={profile.displayName ?? ""} />;
}
