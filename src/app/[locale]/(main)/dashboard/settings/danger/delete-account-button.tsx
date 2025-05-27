"use client";

import { LoaderButton } from "@/components/loader-button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { deleteAccountAction } from "./actions";
import { useServerAction } from "zsa-react";
import { useTranslations } from "next-intl";

export function DeleteAccountButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const t = useTranslations("dashboard.settings.danger");

  const deleteSchema = z.object({
    confirm: z.string().refine((v) => v === "Please delete", {
      message: t("deleteAccountConfirmation"),
    }),
  });

  const form = useForm<{
    confirm: string;
  }>({
    resolver: zodResolver(deleteSchema),
    defaultValues: {
      confirm: "",
    },
  });

  const { execute: deleteAccount, isPending } = useServerAction(
    deleteAccountAction,
    {
      onSuccess: () => {
        setIsOpen(false);
        toast({
          title: t("deleteAccountSuccessTitle"),
          description: t("deleteAccountSuccessDescription"),
        });
      },
      onError: ({ err }) => {
        toast({
          title: t("deleteAccountErrorTitle"),
          description: err.message || t("deleteAccountErrorDescription"),
          variant: "destructive",
        });
      },
    }
  );

  function onSubmit() {
    deleteAccount();
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className="w-fit" variant="destructive">
          {t("deleteAccountButton")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("deleteAccountConfirmTitle")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("deleteAccountConfirmDescription")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("confirm")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
              <LoaderButton isLoading={isPending} variant="destructive">
                {t("delete")}
              </LoaderButton>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
