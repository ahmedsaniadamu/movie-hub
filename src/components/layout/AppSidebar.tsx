import { TrendingUp, Star, Calendar, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useSearchParams, useNavigate } from "react-router";
import logo from "@/assets/logo.png"

const menuItems = [
  { title: "Home", icon: Home, category: "now_playing" },
  { title: "Popular", icon: TrendingUp, category: "popular" },
  { title: "Top Rated", icon: Star, category: "top_rated" },
  { title: "Upcoming", icon: Calendar, category: "upcoming" },
];

export function AppSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeCategory = searchParams.get("category") || "now_playing";

  const handleCategoryClick = (cat: string) => {
    if (window.location.pathname !== "/") {
      navigate(`/?category=${cat}`);
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2 font-bold text-xl text-brand">
          <img src={logo} alt="logo" className="w-42 h-20" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Discover
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = activeCategory === item.category;
                return (
                  <SidebarMenuItem key={item.title} className="px-4 mb-4">
                    <SidebarMenuButton
                      onClick={() => handleCategoryClick(item.category)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg group transition-all",
                        isActive ? "bg-brand text-white hover:bg-brand/90 hover:text-white" : "hover:bg-brand/10"
                      )}
                    >
                      <item.icon className={cn(
                        "w-10 h-10",
                        isActive ? "text-white" : "text-muted-foreground group-hover:text-brand"
                      )} />
                      <span className={cn("font-medium", isActive ? "text-white" : "text-foreground")}>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
