"use client";

import { LoaderButton } from "@/components/loader-button";
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
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { schema } from "./validation";
import { createGroupAction } from "./actions";
import { Textarea } from "@/components/ui/textarea";
import { CheckIcon } from "lucide-react";
import { btnIconStyles } from "@/styles/icons";
import { ToggleContext } from "@/components/interactive-overlay";
import { useTranslations } from "next-intl";

export function CreateGroupForm() {
  const { setIsOpen, preventCloseRef } = useContext(ToggleContext);
  const { toast } = useToast();
  const t = useTranslations("dashboard");
  const { execute, isPending } = useServerAction(createGroupAction, {
    onStart() {
      preventCloseRef.current = true;
    },
    onFinish() {
      preventCloseRef.current = false;
    },
    onError({ err }) {
      toast({
        title: t("somethingWentWrong"),
        description: err.message,
        variant: "destructive",
      });
    },
    onSuccess() {
      toast({
        title: t("groupCreated"),
        description: t("groupCreatedDescription"),
      });
      setIsOpen(false);
    },
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          execute(values).then(() => {});
        })}
        className="flex flex-col gap-4 flex-1 px-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("groupName")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("description")}</FormLabel>
              <FormControl>
                <Textarea rows={7} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoaderButton isLoading={isPending}>
          <CheckIcon className={btnIconStyles} /> {t("createGroupButton")}
        </LoaderButton>
      </form>
    </Form>
  );
}
