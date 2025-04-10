import { createContext, useContext } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const UserContext = createContext({ role: 'admin' });
export function AppSidebar() {
     const { user, } = useAuth();
    const { role } = useContext(UserContext); 

    const projects = [
        { name: "Home", url: "/", icon: "HomeIcon" },
        { name: "Profile", url: "/dashboard/profile", icon: "FaTrademark" },
    ];
      
    const adminMenuItems = [
        { name: "Manage Users", url: "/dashboard/users", icon: "FaTrademark" },
        { name: "Manage Products", url: "/dashboard/products", icon: "ShoppingCartIcon" },
        { name: "Manage Orders", url: "/dashboard/orders", icon: "ShoppingCartIcon" },
    ];
      
    const userMenuItems = [
        { name: "View Orders", url: "/dashboard/orders", icon: "ShoppingCartIcon" },
        { name: "Settings", url: "/dashboard/settings", icon: "SettingsIcon" },
    ];

    const menuItems = role === 'admin' ? [...projects, ...adminMenuItems] : [...projects, ...userMenuItems];
    return (
      <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>CarShop</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild>
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
    )
  }
  