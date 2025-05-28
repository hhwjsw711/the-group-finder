import { Profile } from "@/db/schema";
import { ProfileImageForm } from "./profile-image-form";
import { getCurrentUser } from "@/lib/session";
import { getProfileImageUrl } from "@/use-cases/users";
import Image from "next/image";
import { ConfigurationPanel } from "@/components/configuration-panel";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { getUserProfileLoader } from "./page";
import { getTranslations } from "next-intl/server";

export function getProfileImageFullUrl(profile: { userId: number; image: string | null; imageId: string | null }) {
  return profile.imageId
    ? getProfileImageUrl(profile.userId, profile.imageId)
    : profile.image
    ? profile.image
    : "/profile.png";
}

export async function ProfileImage() {
  const t = await getTranslations("dashboard.settings.profile");
  return (
    <ConfigurationPanel title={t("profileImage")}>
      <Suspense fallback={<Skeleton className="w-full h-[200px] rounded" />}>
        <ProfileImageContent />
      </Suspense>
    </ConfigurationPanel>
  );
}

async function ProfileImageContent() {
  const user = await getCurrentUser();
  const t = await getTranslations("dashboard.settings.profile");
  
  if (!user) {
    return null;
  }

  const profile = await getUserProfileLoader(user.id);

  return (
    <div className="flex flex-col sm:items-center">
      <Image
        src={getProfileImageFullUrl(profile)}
        width={200}
        height={200}
        className="h-[200px] sm:h-[100px] w-full object-cover rounded-xl mb-4 sm:mb-6"
        alt={t("profileImageAlt")}
      />
      <ProfileImageForm />
    </div>
  );
}
