"use client";

import { AuthWrapper } from "@/components/AuthWrapper";
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
import { useAuthContext } from "@/context/auth-context";
import { AuthenticateUser } from "@/interfaces/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().min(1, {
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export default function Home() {
  const { login, loading, user, loadingPage } = useAuthContext();
  const router = useRouter();

  const form = useForm<AuthenticateUser>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: AuthenticateUser) => {
    try {
      console.log("sended");
      await login(values);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) router.push("/posts");
  }, [user]);

  if (loadingPage) return <div>Loading...</div>;

  return (
    <AuthWrapper isPrivate={false}>
      <main className="flex min-h-screen w-full flex-col items-center justify-center">
        <div className="max-w-xl w-full p-24">
          <Form {...form} onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@example.com"
                      {...field}
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button isLoading={loading} type="submit" className="w-full">
              Login
            </Button>
          </Form>
        </div>
      </main>
    </AuthWrapper>
  );
}
