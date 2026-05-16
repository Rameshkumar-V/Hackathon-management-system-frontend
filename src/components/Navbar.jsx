import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import useAppStore from '../store/useAppStore';

export default function Navbar() {
  const { toggleSidebar } = useAppStore();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between bg-white px-4 border-b border-border dark:bg-card">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 text-muted-foreground hover:bg-muted rounded-md md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="hidden md:flex items-center bg-muted px-3 py-1.5 rounded-md border border-border focus-within:ring-2 focus-within:ring-ring focus-within:border-primary transition-all">
          <Search className="h-4 w-4 text-muted-foreground mr-2" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none text-sm w-64 text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
        </button>
        
        <div className="flex items-center gap-2 cursor-pointer p-1 pr-2 rounded-full hover:bg-muted transition-colors border border-transparent hover:border-border">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
            <User className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium hidden sm:block">Admin</span>
        </div>
      </div>
    </header>
  );
}
