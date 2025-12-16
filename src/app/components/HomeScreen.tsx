import { Calendar, ChevronRight, Plus } from 'lucide-react';
import { Badge } from './ui/badge';

interface Case {
  id: string;
  title: string;
  caseNumber: string;
  client: string;
  court: string;
  nextHearing: string;
  status: 'pending' | 'active' | 'closed';
}

interface HomeScreenProps {
  onNavigate: (screen: string, caseId?: string) => void;
}

const MOCK_CASES: Case[] = [
  {
    id: '1',
    title: 'Property Dispute',
    caseNumber: 'CS 234/2024',
    client: 'Rajesh Kumar',
    court: 'District Court, Delhi',
    nextHearing: '2025-12-20',
    status: 'active',
  },
  {
    id: '2',
    title: 'Consumer Complaint',
    caseNumber: 'CC 567/2024',
    client: 'Priya Sharma',
    court: 'Consumer Forum, Mumbai',
    nextHearing: '2025-12-22',
    status: 'active',
  },
  {
    id: '3',
    title: 'Divorce Petition',
    caseNumber: 'MAT 890/2024',
    client: 'Amit Patel',
    court: 'Family Court, Bangalore',
    nextHearing: '2026-01-05',
    status: 'pending',
  },
  {
    id: '4',
    title: 'Employment Dispute',
    caseNumber: 'LAB 123/2024',
    client: 'Sunita Reddy',
    court: 'Labour Court, Hyderabad',
    nextHearing: '2026-01-10',
    status: 'pending',
  },
];

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const getStatusColor = (status: Case['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'closed':
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getDaysUntilHearing = (dateString: string) => {
    const hearing = new Date(dateString);
    const today = new Date();
    const diffTime = hearing.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Past';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
  };

  return (
    <div className="flex-1 overflow-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="p-4">
          <h1 className="text-foreground">My Cases</h1>
          <p className="text-sm text-muted-foreground">{MOCK_CASES.length} active cases</p>
        </div>
      </div>

      {/* Cases List */}
      <div className="p-4 space-y-3">
        {MOCK_CASES.map((caseItem) => (
          <button
            key={caseItem.id}
            onClick={() => onNavigate('case-detail', caseItem.id)}
            className="w-full bg-card border border-border rounded-lg p-4 text-left hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-foreground truncate">{caseItem.title}</h3>
                <p className="text-sm text-muted-foreground">{caseItem.caseNumber}</p>
              </div>
              <Badge className={getStatusColor(caseItem.status)}>
                {caseItem.status}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="truncate">{caseItem.client}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="truncate">{caseItem.court}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-primary" />
                <span className="text-sm text-foreground">
                  {new Date(caseItem.nextHearing).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm text-primary">
                  {getDaysUntilHearing(caseItem.nextHearing)}
                </span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Empty State (if no cases) */}
      {MOCK_CASES.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="size-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Plus className="size-8 text-muted-foreground" />
          </div>
          <h3 className="text-foreground mb-2">No cases yet</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Start by adding your first case
          </p>
        </div>
      )}
    </div>
  );
}
