"use client";

import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { CreateEventForm } from "./create-post-form";
import { Calendar } from "lucide-react";
import { btnIconStyles, btnStyles } from "@/styles/icons";
import { InteractiveOverlay } from "@/components/interactive-overlay";
import { useState } from "react";
import { useTranslations } from "next-intl";

export function CreatePostButton() {
  const { groupId } = useParams<{ groupId: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("dashboard.groups.posts");

  return (
    <>
      <InteractiveOverlay
        title={t("createPost")}
        description={t("createPostDescription")}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        form={<CreateEventForm groupId={parseInt(groupId)} />}
      />

      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        className={btnStyles}
      >
        <Calendar className={btnIconStyles} />
        {t("createPostButton")}
      </Button>
    </>
  );
}
