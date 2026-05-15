import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";
import Link from "next/link";
import { login, signup, loginWithGoogle } from "./actions";

export default async function LoginPage({
    searchParams,
  }: {
    searchParams: Promise<{ error?: string }>
  }) {
    const { error } = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <Link href="/" className="flex items-center mb-8">
        <Zap className="h-8 w-8 text-purple-500 fill-purple-500" />
        <span className="ml-2 text-2xl font-bold text-white tracking-tighter">ClipForge AI</span>
      </Link>
      <Card className="w-full max-w-md bg-white/5 border-white/10 backdrop-blur-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center text-white">Welcome back</CardTitle>
          <CardDescription className="text-center text-gray-400">
            Enter your email to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <form className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input name="email" id="email" type="email" placeholder="m@example.com" required className="bg-white/5 border-white/10 text-white" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password" title="Password" className="text-white">Password</Label>
                <Input name="password" id="password" type="password" required className="bg-white/5 border-white/10 text-white" />
            </div>
            <div className="flex gap-2">
                <Button formAction={login} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                    Sign In
                </Button>
                <Button formAction={signup} variant="outline" className="flex-1 border-white/10 bg-transparent text-white hover:bg-white/5">
                    Sign Up
                </Button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-2 text-gray-400">Or continue with</span>
            </div>
          </div>
          <form action={loginWithGoogle}>
            <Button variant="outline" className="w-full border-white/10 bg-transparent text-white hover:bg-white/5">
                Google
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
            <p className="text-xs text-center text-gray-400">
              Don&apos;t have an account? <Link href="#" className="text-purple-500 hover:underline">Sign up</Link>
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
