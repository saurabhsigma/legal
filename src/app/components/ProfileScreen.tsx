import { User, Settings, Bell, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { Switch } from './ui/switch';

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function ProfileScreen({ onNavigate, onLogout }: ProfileScreenProps) {
  return (
    <div className="flex-1 overflow-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="p-4">
          <h1 className="text-foreground">Profile</h1>
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-4">
        <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
          <div className="size-16 bg-primary rounded-full flex items-center justify-center shrink-0">
            <span className="text-2xl text-primary-foreground">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-foreground">Advocate Name</h2>
            <p className="text-sm text-muted-foreground">+91 98765 43210</p>
            <p className="text-sm text-muted-foreground">advocate@example.com</p>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="px-4 pb-4">
        <h3 className="text-muted-foreground mb-3 px-1">Settings</h3>
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <button 
            onClick={() => onNavigate('notifications')}
            className="w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors border-b border-border"
          >
            <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
              <Bell className="size-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-foreground">Notifications</p>
              <p className="text-sm text-muted-foreground">Manage reminders and alerts</p>
            </div>
            <ChevronRight className="size-5 text-muted-foreground shrink-0" />
          </button>

          <button className="w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors border-b border-border">
            <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
              <Settings className="size-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-foreground">General Settings</p>
              <p className="text-sm text-muted-foreground">App preferences</p>
            </div>
            <ChevronRight className="size-5 text-muted-foreground shrink-0" />
          </button>

          <button className="w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors">
            <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
              <User className="size-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-foreground">Edit Profile</p>
              <p className="text-sm text-muted-foreground">Update your information</p>
            </div>
            <ChevronRight className="size-5 text-muted-foreground shrink-0" />
          </button>
        </div>
      </div>

      {/* Help & Support */}
      <div className="px-4 pb-4">
        <h3 className="text-muted-foreground mb-3 px-1">Help & Support</h3>
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <button className="w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors">
            <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
              <HelpCircle className="size-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-foreground">Help & FAQ</p>
              <p className="text-sm text-muted-foreground">Get help using the app</p>
            </div>
            <ChevronRight className="size-5 text-muted-foreground shrink-0" />
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="px-4 pb-4">
        <button 
          onClick={onLogout}
          className="w-full bg-card border border-destructive rounded-lg p-4 flex items-center gap-3 hover:bg-destructive/10 transition-colors"
        >
          <div className="size-10 bg-destructive/10 rounded-lg flex items-center justify-center shrink-0">
            <LogOut className="size-5 text-destructive" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-destructive">Logout</p>
          </div>
        </button>
      </div>

      {/* App Version */}
      <div className="px-4 pb-4 text-center">
        <p className="text-sm text-muted-foreground">Version 1.0.0</p>
      </div>
    </div>
  );
}
