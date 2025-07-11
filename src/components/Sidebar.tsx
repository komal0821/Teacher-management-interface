'use client';

import { useState } from 'react';
import { useUser, SignOutButton } from '@clerk/nextjs';
import { 
  BarChart3, 
  Users, 
  Handshake, 
  Calendar, 
  GraduationCap, 
  BookOpen, 
  CalendarDays, 
  CreditCard, 
  Settings,
  Menu,
  X,
  LogOut,
  User as UserIcon
} from 'lucide-react';

interface SidebarProps {
  activeItem: string;
  onItemClick: (itemId: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard & Reports', icon: BarChart3 },
  { id: 'manage-teachers', label: 'Manage Teachers', icon: Users },
  { id: 'teacher-meetings', label: 'Teacher Meetings', icon: Handshake },
  { id: 'teacher-leaves', label: 'Teacher Leaves', icon: Calendar },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'schedule', label: 'Schedule', icon: CalendarDays },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeItem = 'dashboard', onItemClick }: SidebarProps) {
  const { user } = useUser();
  const [selectedItem, setSelectedItem] = useState(activeItem);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleItemClick = (itemId: string) => {
    setSelectedItem(itemId);
    onItemClick(itemId);
    setIsMobileMenuOpen(false); // Close mobile menu after selection
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-slate-800 text-white p-3 rounded-lg shadow-lg hover:bg-slate-700 transition-colors"
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-800 text-white h-full flex flex-col transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold text-white">Teacher Portal</h1>
          <p className="text-slate-300 text-sm mt-1">Management System</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = selectedItem === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      isActive
                        ? 'bg-[#B43F3F] text-white shadow-md'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium truncate">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile & Sign Out */}
        <div className="p-4 border-t border-slate-700">
          {user && (
            <div className="space-y-3">
              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#B43F3F] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user.firstName?.[0] || user.emailAddresses[0]?.emailAddress[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'User'}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {user.emailAddresses[0]?.emailAddress}
                  </p>
                </div>
              </div>
              
              {/* Sign Out Button */}
              <SignOutButton redirectUrl="/sign-in">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </SignOutButton>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
