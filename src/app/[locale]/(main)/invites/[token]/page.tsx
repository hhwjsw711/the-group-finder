import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { getCurrentUser } from "@/lib/session";
import { pageTitleStyles, pageWrapperStyles } from "@/styles/common";
import { acceptInviteUseCase } from "@/use-cases/invites";
import { Link } from "@react-email/components";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

export default async function InvitesPage({
  params,
}: {
  params: Promise<{
    token: string;
  }>;
}) {
  const { token } = await params;
  const t = await getTranslations("invites");

  if (!token) {
    throw new Error(t("invalidInviteLink"));
  }

  const user = await getCurrentUser();

  if (user) {
    const groupId = await acceptInviteUseCase(user, { token });
    redirect(`/dashboard/groups/${groupId}`);
  }

  return (
    <div className={pageWrapperStyles}>
      {!user && (
        <>
          <h1 className={pageTitleStyles}>{t("processingInvites")}</h1>
          <p className="max-w-md text-lg">
            {t("processingInvitesDescription")}
          </p>

          <Button asChild>
            <Link
              href={`/sign-in?callbackUrl=${env.HOST_NAME}/invites/${token}`}
            >
              {t("signInToAcceptInvite")}
            </Link>
          </Button>
        </>
      )}
    </div>
  );
}
