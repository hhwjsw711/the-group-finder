import { getUserProfileUseCase } from "@/use-cases/users";
import BioView from "./bio-view";
import Image from "next/image";
import { cardStyles } from "@/styles/common";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export default async function InfoContent({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const t = await getTranslations("users");
  const { userId } = await params;
  const userIdInt = parseInt(userId);
  const profile = await getUserProfileUseCase(userIdInt);

  return (
    <div>
      {!profile.bio && (
        <div
          className={cn(
            cardStyles,
            "flex flex-col items-center justify-center py-12 gap-8"
          )}
        >
          <Image
            src="/empty-state/mountain.svg"
            width="200"
            height="200"
            alt={t("noBioPlaceholderImageAlt")}
          ></Image>
          <h2 className="text-2xl">{t("noBio")}</h2>
        </div>
      )}

      {profile.bio && <BioView bio={profile.bio} />}
    </div>
  );
}
