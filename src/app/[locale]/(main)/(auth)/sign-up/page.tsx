"use client";

import { z } from "zod";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { pageTitleStyles } from "@/styles/common";
import { cn } from "@/lib/utils";
import { useServerAction } from "zsa-react";
import { signUpAction } from "./actions";
import { LoaderButton } from "@/components/loader-button";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function RegisterPage() {
  const { toast } = useToast();
  const t = useTranslations("auth");

  const { execute, isPending, error } = useServerAction(signUpAction, {
    onError({ err }) {
      toast({
        title: t("somethingWentWrong"),
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const registrationSchema = z
    .object({
      email: z.string().email(),
      password: z.string().min(8),
      passwordConfirmation: z.string().min(8),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: t("passwordsDontMatch"),
      path: ["passwordConfirmation"],
    });

  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  function onSubmit(values: z.infer<typeof registrationSchema>) {
    execute(values);
  }

  return (
    <div className="py-24 mx-auto max-w-[400px] space-y-6">
      <h1 className={cn(pageTitleStyles, "text-center")}>{t("signUp")}</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full"
                    placeholder={t("enterEmail")}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("password")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full"
                    placeholder={t("enterPassword")}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("confirmPassword")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full"
                    placeholder={t("enterConfirmPassword")}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>{t("somethingWentWrong")}</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}

          <LoaderButton isLoading={isPending} className="w-full" type="submit">
            {t("signUp")}
          </LoaderButton>
        </form>
      </Form>
    </div>
  );
}
