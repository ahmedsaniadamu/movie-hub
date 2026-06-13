import { BrowserRouter, Routes, Route } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import Home from "@/pages/home/home";
import MovieDetails from "@/pages/movie-details/movie-details";

export default function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
          <AppSidebar onCategoryChange={() => {}} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </div>
      </SidebarProvider>
    </BrowserRouter>
  );
}
