"use client";

import { LoaderButton } from "@/components/loader-button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useContext } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { CalendarDays, Terminal } from "lucide-react";
import { btnIconStyles } from "@/styles/icons";
import { Textarea } from "@/components/ui/textarea";
import { createPostAction } from "./actions";
import { GroupId } from "@/db/schema";
import { useServerAction } from "zsa-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ToggleContext } from "@/components/interactive-overlay";
import { useTranslations } from "next-intl";

const createEventSchema = z.object({
  title: z.string().min(1),
  message: z.string().min(1),
});

export function CreateEventForm({ groupId }: { groupId: GroupId }) {
  const { setIsOpen: setIsOverlayOpen } = useContext(ToggleContext);
  const { toast } = useToast();
  const t = useTranslations("dashboard.groups.posts");

  const { execute, error, isPending } = useServerAction(createPostAction, {
    onSuccess() {
      toast({
        title: t("success"),
        description: t("postCreatedSuccessfully"),
      });
      setIsOverlayOpen(false);
    },
    onError() {
      toast({
        title: t("error"),
        variant: "destructive",
        description: t("somethingWentWrongCreatingPost"),
      });
    },
  });

  const form = useForm<z.infer<typeof createEventSchema>>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof createEventSchema>> = (
    values,
    event
  ) => {
    execute({
      groupId,
      title: values.title,
      message: values.message,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 flex-1 px-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>{t("postTitle")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>{t("postMessage")}</FormLabel>
              <FormControl>
                <Textarea rows={7} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>{t("errorCreatingPost")}</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        <LoaderButton isLoading={isPending}>
          <CalendarDays className={btnIconStyles} /> {t("createPostButton")}
        </LoaderButton>
      </form>
    </Form>
  );
}
