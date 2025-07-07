
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Settings, Calendar } from "lucide-react";

export const ProfileNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    {
      path: "/profile",
      label: "Profile",
      icon: User
    },
    {
      path: "/profile/settings", 
      label: "Settings",
      icon: Settings
    },
    {
      path: "/class-signup",
      label: "Classes",
      icon: Calendar
    }
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Button
            key={item.path}
            asChild
            variant={isActive ? "default" : "outline"}
            className="flex items-center space-x-2"
          >
            <Link to={item.path}>
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          </Button>
        );
      })}
    </div>
  );
};
