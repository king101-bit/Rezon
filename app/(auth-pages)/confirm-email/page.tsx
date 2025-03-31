// app/confirm-email/page.tsx
import { MailCheck } from "lucide-react";
import Link from "next/link";

export default function ConfirmEmail({
  searchParams,
}: {
  searchParams: { message?: string; email?: string };
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <MailCheck className="h-6 w-6 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold">Check your email</h1>
        <p className="text-gray-600">
          We've sent a verification link to{" "}
          <span className="font-medium">
            {searchParams.email || "your email address"}
          </span>
          . Please click the link to verify your account.
        </p>
        <div className="pt-4">
          <Link
            href="/sign-in"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Return to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
