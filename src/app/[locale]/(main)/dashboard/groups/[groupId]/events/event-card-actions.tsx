"use client";

import { EllipsisVertical, PencilIcon, TrashIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteModal } from "@/components/delete-modal";
import { useServerAction } from "zsa-react";
import { deleteEventAction } from "./actions";
import { Event } from "@/db/schema";
import { btnIconStyles, btnStyles } from "@/styles/icons";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { InteractiveOverlay } from "@/components/interactive-overlay";
import { EditEventForm } from "./edit-event-form";

export function EventCardActions({ event }: { event: Event }) {
  const t = useTranslations("dashboard.groups.events");
  const [isOpen, setIsOpen] = useState(false);
  const [isEditEventOpen, setIsEditEventOpen] = useState(false);
  const { execute, isPending } = useServerAction(deleteEventAction, {
    onSuccess() {
      setIsOpen(false);
    },
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <InteractiveOverlay
        isOpen={isEditEventOpen}
        setIsOpen={setIsEditEventOpen}
        title={t("editEvent")}
        description={t("editEventDescription")}
        form={<EditEventForm event={event} />}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        title={t("deleteEvent")}
        description={t("deleteEventDescription")}
        onConfirm={() => {
          execute({
            eventId: event.id,
          });
        }}
        isPending={isPending}
        confirmText={t("delete")}
      />

      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size={"icon"}>
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={(e) => {
              setIsEditEventOpen(true);
            }}
            className={btnStyles}
          >
            <PencilIcon className={btnIconStyles} />
            {t("editEvent")}
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(btnStyles, "text-red-500")}
            onClick={(e) => {
              setIsDeleteModalOpen(true);
            }}
          >
            <TrashIcon className={btnIconStyles} />
            {t("deleteEvent")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
