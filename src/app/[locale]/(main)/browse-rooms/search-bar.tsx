"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

const formSchema = z.object({
  search: z.string().min(0).max(50),
});

export function SearchBar() {
  const t = useTranslations("browseRooms");
  const router = useRouter();
  const query = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: query.get("search") ?? "",
    },
  });

  const search = query.get("search");

  useEffect(() => {
    form.setValue("search", search ?? "");
  }, [search, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.search) {
      router.push(`/browse-rooms?search=${values.search}`);
    } else {
      router.push("/browse-rooms");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="w-[440px]"
                  placeholder={t("placeholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          <SearchIcon className="mr-2" /> {t("search")}
        </Button>

        {query.get("search") && (
          <Button
            variant="link"
            onClick={() => {
              form.setValue("search", "");
              router.push("/");
            }}
          >
            {t("clear")}
          </Button>
        )}
      </form>
    </Form>
  );
}
