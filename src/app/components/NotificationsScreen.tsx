import { ChevronLeft } from 'lucide-react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface NotificationsScreenProps {
  onBack: () => void;
}

export function NotificationsScreen({ onBack }: NotificationsScreenProps) {
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="p-4 flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-muted rounded-lg">
            <ChevronLeft className="size-6 text-foreground" />
          </button>
          <h1 className="text-foreground">Notification Settings</h1>
        </div>
      </div>

      {/* Settings */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-6">
          {/* Hearing Reminders */}
          <div>
            <h3 className="text-foreground mb-4">Hearing Reminders</h3>
            <div className="bg-card border border-border rounded-lg divide-y divide-border">
              <div className="p-4 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <Label htmlFor="hearing-1day">1 day before hearing</Label>
                  <p className="text-sm text-muted-foreground">Get notified one day in advance</p>
                </div>
                <Switch id="hearing-1day" defaultChecked />
              </div>

              <div className="p-4 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <Label htmlFor="hearing-morning">Morning of hearing</Label>
                  <p className="text-sm text-muted-foreground">Get notified on hearing day at 8 AM</p>
                </div>
                <Switch id="hearing-morning" defaultChecked />
              </div>

              <div className="p-4 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <Label htmlFor="hearing-1hour">1 hour before hearing</Label>
                  <p className="text-sm text-muted-foreground">Get notified one hour in advance</p>
                </div>
                <Switch id="hearing-1hour" defaultChecked />
              </div>
            </div>
          </div>

          {/* Document Reminders */}
          <div>
            <h3 className="text-foreground mb-4">Document Reminders</h3>
            <div className="bg-card border border-border rounded-lg divide-y divide-border">
              <div className="p-4 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <Label htmlFor="doc-deadline">Document deadlines</Label>
                  <p className="text-sm text-muted-foreground">Remind about document submissions</p>
                </div>
                <Switch id="doc-deadline" defaultChecked />
              </div>
            </div>
          </div>

          {/* Other Notifications */}
          <div>
            <h3 className="text-foreground mb-4">Other Notifications</h3>
            <div className="bg-card border border-border rounded-lg divide-y divide-border">
              <div className="p-4 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <Label htmlFor="custom-reminders">Custom reminders</Label>
                  <p className="text-sm text-muted-foreground">Reminders you create manually</p>
                </div>
                <Switch id="custom-reminders" defaultChecked />
              </div>

              <div className="p-4 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <Label htmlFor="app-updates">App updates</Label>
                  <p className="text-sm text-muted-foreground">Get notified about new features</p>
                </div>
                <Switch id="app-updates" />
              </div>
            </div>
          </div>

          {/* Notification Method */}
          <div>
            <h3 className="text-foreground mb-4">Notification Method</h3>
            <div className="bg-card border border-border rounded-lg divide-y divide-border">
              <div className="p-4 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <Label htmlFor="push-notif">Push notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications on device</p>
                </div>
                <Switch id="push-notif" defaultChecked />
              </div>

              <div className="p-4 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <Label htmlFor="sms-notif">SMS notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                </div>
                <Switch id="sms-notif" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
