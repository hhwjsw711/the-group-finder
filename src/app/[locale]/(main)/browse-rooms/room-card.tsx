"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { GithubIcon } from "lucide-react";
import { TagsList } from "@/components/tags-list";
import { splitTags } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function RoomCard({ room }: { room: Room }) {
  const t = useTranslations("browseRooms");
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TagsList tags={splitTags(room.tags)} />
        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            className="flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            {t("githubProject")}
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>{t("joinRoom")}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
