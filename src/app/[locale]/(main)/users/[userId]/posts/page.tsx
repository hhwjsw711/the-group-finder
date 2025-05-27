import { getPublicPostsByUserUseCase } from "@/use-cases/posts";
import { UserPostCard } from "./user-post-card";
import Image from "next/image";
import { cardStyles } from "@/styles/common";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export default async function PostsContent({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const t = await getTranslations("users");
  const { userId } = await params;
  const userIdInt = parseInt(userId);
  const posts = await getPublicPostsByUserUseCase(userIdInt);

  return (
    <div className="space-y-12">
      {posts.length === 0 && (
        <div
          className={cn(
            cardStyles,
            "flex flex-col items-center justify-center py-12 gap-8"
          )}
        >
          <Image
            src="/empty-state/posts.svg"
            width="200"
            height="200"
            alt={t("noPostsPlaceholderImageAlt")}
          ></Image>
          <h2 className="text-2xl">{t("noPosts")}</h2>
        </div>
      )}
      <div className="space-y-8">
        {posts.map((post) => (
          <UserPostCard post={post} />
        ))}
      </div>
    </div>
  );
}
