import { Sidebar, SidebarContent, SidebarFooter } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useLogout } from "@/hooks"
const AppSidebar = () => {
  const { logout } = useLogout()
  return (
    <Sidebar>
      <SidebarContent />
      <SidebarFooter>
        <Button onClick={() => logout()} >Logout</Button>
      </SidebarFooter>
    </Sidebar>
  )
}
export default AppSidebar