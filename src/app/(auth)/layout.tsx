import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-1 items-center justify-center bg-stone-50 px-4 py-12">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 block text-center text-xl font-semibold text-stone-900">
          Posada
        </Link>
        <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          {children}
        </div>
      </div>
    </main>
  );
}
