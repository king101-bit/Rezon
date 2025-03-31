import { signUpAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

export default async function Signup(props: {
  searchParams: Promise<{ message?: string; type?: string }>;
}) {
  const searchParams = await props.searchParams;

  // Only show errors here (success redirects to confirm-email)
  if (searchParams.type === "error") {
    return (
      <div className="w-full flex-1 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full bg-red-50 p-4 rounded-md text-red-800">
          {searchParams.message}
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Column - Form */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center bg-white">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-sm text-gray-600 mt-2">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-teal-600 font-medium underline"
              >
                Sign in
              </Link>
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                className="mt-1 w-full"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="........"
                className="mt-1 w-full"
                minLength={8}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 8 characters long
              </p>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="terms" required />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the current IP service and Privacy Policy
              </label>
            </div>

            <SubmitButton
              formAction={signUpAction}
              pendingText="Creating account..."
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded"
            >
              Create account
            </SubmitButton>
          </form>
        </div>
      </div>

      {/* Right Column - Content */}
      <div className="w-full md:w-1/2 bg-gray-100 p-12 py-8 flex items-center justify-center">
        <div className="max-w-md text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Unlimited Movies, TV Shows, and More.
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Watch anywhere. Cancel anytime. Completely free.
          </p>

          <div className="grid grid-cols-3 gap-4">
            {["Fee 202", "Fee 202", "Fee 202"].map((title, index) => (
              <div key={index} className="bg-white p-3 rounded shadow-sm">
                <div className="h-32 bg-gray-200 rounded mb-2 flex items-center justify-center">
                  <span className="text-gray-500">Poster</span>
                </div>
                <p className="font-medium">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
