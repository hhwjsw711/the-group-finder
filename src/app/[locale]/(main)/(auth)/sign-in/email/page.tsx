"use client";

import { z } from "zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { signInAction } from "./actions";
import { LoaderButton } from "@/components/loader-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const registrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function SignInPage() {
  const { toast } = useToast();
  const t = useTranslations("auth");

  const { execute, isPending, error, reset } = useServerAction(signInAction, {
    onError({ err }) {
      toast({
        title: t("somethingWentWrong"),
        description: err.message,
        variant: "destructive",
      });
    },
    onSuccess() {
      toast({
        title: t("letGo"),
        description: t("enjoyYourSession"),
      });
    },
  });

  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof registrationSchema>) {
    execute(values);
  }

  return (
    <div className="py-24 mx-auto max-w-[400px] space-y-6">
      <h1 className={cn(pageTitleStyles, "text-center")}>{t("signIn")}</h1>

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

          {error && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>{t("somethingWentWrong")}</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}

          <LoaderButton isLoading={isPending} className="w-full" type="submit">
            {t("signIn")}
          </LoaderButton>
        </form>
      </Form>

      <div className="flex justify-center">
        <Button asChild variant="link">
          <Link href="/sign-in/forgot-password">{t("forgotPassword")}</Link>
        </Button>
      </div>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-gray-100 px-2 text-gray-500 dark:bg-gray-950 dark:text-gray-400">
            {t("or")}
          </span>
        </div>
      </div>

      <Button className="w-full" variant={"secondary"}>
        <Link href="/sign-up">{t("createAccount")}</Link>
      </Button>
    </div>
  );
}
