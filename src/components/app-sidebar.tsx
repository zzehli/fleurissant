import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useLogout } from "@/hooks"
import { Link } from "react-router"
const AppSidebar = () => {
  const { logout } = useLogout()

  const items = [
    {
      title: "Home",
      url: "/admin",
    },
    {
      title: "Products",
      url: "/admin/products",
    },
    {
      title: "Orders",
      url: "#",
    }
  ]

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={() => logout()} >Logout</Button>
      </SidebarFooter>
    </Sidebar>
  )
}
export default AppSidebar