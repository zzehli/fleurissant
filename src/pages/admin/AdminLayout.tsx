import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components"
import { Outlet } from "react-router"
export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main
        className="w-full"
      >
        <SidebarTrigger />
        <Outlet/>
      </main>
    </SidebarProvider>
  )
}