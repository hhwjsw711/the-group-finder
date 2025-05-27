"use client";

import { LoaderButton } from "@/components/loader-button";
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
import { CheckIcon, Terminal } from "lucide-react";
import { btnIconStyles } from "@/styles/icons";
import { Textarea } from "@/components/ui/textarea";
import { useServerAction } from "zsa-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ToggleContext } from "@/components/interactive-overlay";
import { updateReplyAction } from "./actions";
import { Reply } from "@/db/schema";
import { useTranslations } from "next-intl";

const createReplySchema = z.object({
  message: z.string().min(1),
});

export function EditReplyForm({ reply }: { reply: Reply }) {
  const { setIsOpen: setIsOverlayOpen } = useContext(ToggleContext);
  const { toast } = useToast();
  const t = useTranslations("dashboard.groups.posts");

  const { execute, error, isPending } = useServerAction(updateReplyAction, {
    onSuccess() {
      toast({
        title: t("success"),
        description: t("replyCreatedSuccessfully"),
      });
      setIsOverlayOpen(false);
      form.reset();
    },
    onError() {
      toast({
        title: t("error"),
        variant: "destructive",
        description: t("somethingWentWrongCreatingReply"),
      });
    },
  });

  const form = useForm<z.infer<typeof createReplySchema>>({
    resolver: zodResolver(createReplySchema),
    defaultValues: {
      message: reply.message,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof createReplySchema>> = (
    values
  ) => {
    execute({
      replyId: reply.id,
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
          name="message"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>{t("replyMessage")}</FormLabel>
              <FormControl>
                <Textarea rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>{t("errorCreatingReply")}</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        <LoaderButton isLoading={isPending}>
          <CheckIcon className={btnIconStyles} /> {t("updateReplyButton")}
        </LoaderButton>
      </form>
    </Form>
  );
}
