"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { editRoomAction } from "./actions";
import { Room } from "@/db/schema";
import { toast } from "@/components/ui/use-toast";
import { useTranslations } from "next-intl";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(250),
  githubRepo: z.string().min(1).max(50),
  tags: z.string().min(1).max(50),
});

export function EditRoomForm({ room }: { room: Room }) {
  const t = useTranslations("editRoom");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: room.name,
      description: room.description ?? "",
      githubRepo: room.githubRepo ?? "",
      tags: room.tags,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await editRoomAction({
      id: room.id,
      ...values,
    });
    toast({
      title: t("roomUpdated"),
      description: t("roomUpdatedDescription"),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("name")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("namePlaceholder")}
                />
              </FormControl>
              <FormDescription>{t("nameDescription")}</FormDescription>
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
                <Input
                  {...field}
                  placeholder={t("descriptionPlaceholder")}
                />
              </FormControl>
              <FormDescription>
                {t("descriptionDescription")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="githubRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("githubProject")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("githubProjectPlaceholder")}
                />
              </FormControl>
              <FormDescription>
                {t("githubProjectDescription")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("tags")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("tagsPlaceholder")}
                />
              </FormControl>
              <FormDescription>
                {t("tagsDescription")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{t("submit")}</Button>
      </form>
    </Form>
  );
}
