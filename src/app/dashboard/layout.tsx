import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-black w-full">
        <DashboardSidebar />
        <main className="flex-1 overflow-auto">
          <header className="h-14 border-b border-white/10 flex items-center px-6 gap-4 sticky top-0 bg-black/50 backdrop-blur-md z-10">
            <SidebarTrigger className="text-white" />
            <div className="h-4 w-[1px] bg-white/10" />
            <h2 className="text-sm font-medium text-gray-400">Dashboard</h2>
          </header>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
