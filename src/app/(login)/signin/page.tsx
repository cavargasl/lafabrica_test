"use client";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserService } from "@/core/auth/application/UserService";
import { IUserSignIn } from "@/core/auth/domain/User";
import { FirebaseUserRepository } from "@/core/auth/infrastructure/FirebaseUserRepository";
import { setUser } from "@/store/slices/userSlice";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const SignInPage = () => {
  const [isGuest, setIsGuest] = useState(false);
  const { register, handleSubmit } = useForm<IUserSignIn>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleGuestCheck = () => {
    setIsGuest(!isGuest);
  };

  const onSubmit = async (data: IUserSignIn) => {
    setLoading(true);
    try {
      if (isGuest) {
        const fakeUser = {
          id: "guest",
          email: "guest@example.com",
          name: "Guest User",
        };
        dispatch(setUser(fakeUser));
        router.push("/dashboard");
      } else {
        const userService = UserService(FirebaseUserRepository());
        const user = await userService.signInWithEmailAndPassword(data);
        dispatch(setUser(user));
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error to sign in with email and password:", error);
      toast.error("Error to sign in with email and password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const userService = UserService(FirebaseUserRepository());
      const user = await userService.signInWithGoogle();
      dispatch(setUser(user));
      router.push("/dashboard");
    } catch (error) {
      console.error("Error to sign in with Google:", error);
      toast.error("Error to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center">
      <header className="w-full absolute left-0 top-0 flex items-center border-b">
        <div className="container mx-auto flex items-center h-16 py-4">
          <Logo />
        </div>
      </header>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Sign in to your account
          </CardTitle>
          <CardDescription>
            Enter your details to sign in or continue with Google
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit(onSubmit)} className="gap-4">
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  required
                  disabled={isGuest}
                  {...register("email")}
                />
              </div>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  required
                  disabled={isGuest}
                  {...register("password")}
                />
              </div>
              <div className="flex gap-2">
                <Checkbox
                  id="guest"
                  checked={isGuest}
                  onCheckedChange={handleGuestCheck}
                />
                <Label htmlFor="guest">Sign in as guest</Label>
              </div>
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading
                  </>
                ) : (
                  isGuest ? "Sign in as guest" : "Sign In with email"
                )}
              </Button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" type="button" onClick={handleGoogleSignIn} disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            Google
          </Button>
        </CardContent>
        <CardFooter className="flex items-center gap-2">
          <span className="text-muted-foreground">
            Don&apos;t have an account?
          </span>
          <Link href="/signup" className="text-blue-500">
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInPage;
