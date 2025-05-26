"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { btnIconStyles, btnStyles } from "@/styles/icons";
import { InteractiveOverlay } from "@/components/interactive-overlay";
import { useState } from "react";
import { CreateGroupForm } from "./create-group-form";
import { useTranslations } from "next-intl";

export function CreateGroupButton() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("dashboard");

  return (
    <>
      <InteractiveOverlay
        title={t("createGroup")}
        description={t("createGroupDescription")}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        form={<CreateGroupForm />}
      />

      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        className={btnStyles}
      >
        <PlusCircle className={btnIconStyles} />
        {t("createGroupButton")}
      </Button>
    </>
  );
}
