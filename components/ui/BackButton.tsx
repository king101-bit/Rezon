'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-6 inline-flex items-center text-sm text-blue-600 hover:underline"
    >
      ← Back
    </button>
  );
}
