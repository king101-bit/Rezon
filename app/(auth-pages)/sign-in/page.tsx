import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form className="w-full max-w-md mx-auto p-8 py-8 justify-center items-center bg-white rounded-lg shadow-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-medium mb-2">Sign in</h1>
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link className="text-blue-600 font-medium underline" href="/sign-up">
            Sign up
          </Link>
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="block mb-1">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="w-full"
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <Label htmlFor="password">Password</Label>
            <Link
              className="text-xs text-blue-600 hover:text-blue-800 underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Your password"
            className="w-full"
            required
          />
        </div>

        <SubmitButton
          pendingText="Signing In..."
          formAction={signInAction}
          className="w-full mt-6"
        >
          Sign in
        </SubmitButton>

        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
