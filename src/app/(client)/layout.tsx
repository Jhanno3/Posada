import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ClientSidebar } from "@/components/layout/client-sidebar";

export default async function ClientAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-1">
      <ClientSidebar />
      <main className="flex-1 bg-stone-50 p-8">{children}</main>
    </div>
  );
}
