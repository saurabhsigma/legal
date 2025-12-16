import { Bell, Calendar, Clock } from 'lucide-react';
import { Badge } from './ui/badge';

interface Alert {
  id: string;
  type: 'hearing' | 'deadline' | 'reminder';
  title: string;
  description: string;
  date: string;
  time?: string;
  caseNumber: string;
  priority: 'high' | 'medium' | 'low';
}

const MOCK_ALERTS: Alert[] = [
  {
    id: '1',
    type: 'hearing',
    title: 'Property Dispute Hearing',
    description: 'Arguments at District Court, Delhi',
    date: '2025-12-20',
    time: '10:30 AM',
    caseNumber: 'CS 234/2024',
    priority: 'high',
  },
  {
    id: '2',
    type: 'hearing',
    title: 'Consumer Complaint Hearing',
    description: 'Evidence submission at Consumer Forum',
    date: '2025-12-22',
    time: '11:00 AM',
    caseNumber: 'CC 567/2024',
    priority: 'high',
  },
  {
    id: '3',
    type: 'deadline',
    title: 'Document Submission Deadline',
    description: 'Submit property documents',
    date: '2025-12-18',
    caseNumber: 'CS 234/2024',
    priority: 'medium',
  },
  {
    id: '4',
    type: 'reminder',
    title: 'Client Meeting',
    description: 'Discuss case strategy with Rajesh Kumar',
    date: '2025-12-17',
    time: '03:00 PM',
    caseNumber: 'CS 234/2024',
    priority: 'medium',
  },
];

export function AlertsScreen() {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'hearing':
        return <Calendar className="size-5 text-primary" />;
      case 'deadline':
        return <Clock className="size-5 text-destructive" />;
      case 'reminder':
        return <Bell className="size-5 text-secondary" />;
    }
  };

  const getPriorityColor = (priority: Alert['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-blue-100 text-blue-700';
    }
  };

  const getDaysUntil = (dateString: string) => {
    const alertDate = new Date(dateString);
    const today = new Date();
    const diffTime = alertDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Past';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `In ${diffDays} days`;
  };

  return (
    <div className="flex-1 overflow-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="p-4">
          <h1 className="text-foreground">Alerts & Reminders</h1>
          <p className="text-sm text-muted-foreground">{MOCK_ALERTS.length} upcoming alerts</p>
        </div>
      </div>

      {/* Alerts List */}
      <div className="p-4 space-y-3">
        {MOCK_ALERTS.map((alert) => (
          <div
            key={alert.id}
            className="bg-card border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-foreground">{alert.title}</h3>
                  <Badge className={getPriorityColor(alert.priority)}>
                    {alert.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {alert.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {alert.caseNumber}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {new Date(alert.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                  })}
                  {alert.time && ` • ${alert.time}`}
                </span>
              </div>
              <span className="text-sm text-primary">
                {getDaysUntil(alert.date)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {MOCK_ALERTS.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="size-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Bell className="size-8 text-muted-foreground" />
          </div>
          <h3 className="text-foreground mb-2">No alerts</h3>
          <p className="text-sm text-muted-foreground">
            You're all caught up!
          </p>
        </div>
      )}
    </div>
  );
}
