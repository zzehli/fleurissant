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
      title: "Stocks",
      url: "#",
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
                    <a href={item.url}>
                      <span>{item.title}</span>
                    </a>
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