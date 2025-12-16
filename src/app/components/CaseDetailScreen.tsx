import { useState } from 'react';
import { ChevronLeft, Calendar, FileText, Users, StickyNote, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface CaseDetailScreenProps {
  caseId: string;
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

const MOCK_CASE = {
  id: '1',
  title: 'Property Dispute',
  caseNumber: 'CS 234/2024',
  client: 'Rajesh Kumar',
  court: 'District Court, Delhi',
  caseType: 'Civil',
  status: 'active',
  filingDate: '2024-03-15',
  description: 'Case regarding property ownership dispute between two parties.',
};

const MOCK_HEARINGS = [
  {
    id: '1',
    date: '2025-12-20',
    time: '10:30 AM',
    purpose: 'Arguments',
    notes: 'Bring property documents',
    status: 'upcoming',
  },
  {
    id: '2',
    date: '2024-11-15',
    time: '11:00 AM',
    purpose: 'Evidence Submission',
    notes: 'Documents submitted successfully',
    status: 'completed',
  },
  {
    id: '3',
    date: '2024-09-20',
    time: '02:30 PM',
    purpose: 'First Hearing',
    notes: 'Case admitted',
    status: 'completed',
  },
];

const MOCK_DOCUMENTS = [
  {
    id: '1',
    name: 'Property Deed',
    type: 'PDF',
    uploadDate: '2024-03-15',
    size: '2.3 MB',
  },
  {
    id: '2',
    name: 'Sale Agreement',
    type: 'PDF',
    uploadDate: '2024-03-16',
    size: '1.8 MB',
  },
  {
    id: '3',
    name: 'Identity Proof',
    type: 'PDF',
    uploadDate: '2024-03-15',
    size: '890 KB',
  },
];

const MOCK_PEOPLE = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    role: 'Client',
    phone: '+91 98765 43210',
  },
  {
    id: '2',
    name: 'Adv. Suresh Verma',
    role: 'Opposing Counsel',
    phone: '+91 98765 43211',
  },
  {
    id: '3',
    name: 'Judge K.R. Sharma',
    role: 'Judge',
    phone: 'N/A',
  },
];

const MOCK_NOTES = [
  {
    id: '1',
    content: 'Client mentioned that original property documents are with uncle',
    date: '2024-12-10',
  },
  {
    id: '2',
    content: 'Need to get certified copies of registry documents before next hearing',
    date: '2024-12-05',
  },
];

export function CaseDetailScreen({ onBack, onNavigate }: CaseDetailScreenProps) {
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="p-4 flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-muted rounded-lg">
            <ChevronLeft className="size-6 text-foreground" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-foreground truncate">{MOCK_CASE.title}</h1>
            <p className="text-sm text-muted-foreground">{MOCK_CASE.caseNumber}</p>
          </div>
          <Badge className="bg-green-100 text-green-700">{MOCK_CASE.status}</Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start rounded-none border-b border-border bg-background px-4 h-12">
          <TabsTrigger value="info" className="gap-2">
            <FileText className="size-4" />
            Info
          </TabsTrigger>
          <TabsTrigger value="hearings" className="gap-2">
            <Calendar className="size-4" />
            Hearings
          </TabsTrigger>
          <TabsTrigger value="documents" className="gap-2">
            <FileText className="size-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="people" className="gap-2">
            <Users className="size-4" />
            People
          </TabsTrigger>
          <TabsTrigger value="notes" className="gap-2">
            <StickyNote className="size-4" />
            Notes
          </TabsTrigger>
        </TabsList>

        {/* Info Tab */}
        <TabsContent value="info" className="flex-1 overflow-auto p-4 mt-0">
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-4 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Client</p>
                <p className="text-foreground">{MOCK_CASE.client}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Court</p>
                <p className="text-foreground">{MOCK_CASE.court}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Case Type</p>
                <p className="text-foreground">{MOCK_CASE.caseType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Filing Date</p>
                <p className="text-foreground">
                  {new Date(MOCK_CASE.filingDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-foreground mb-3">Description</h3>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-muted-foreground">{MOCK_CASE.description}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Hearings Tab */}
        <TabsContent value="hearings" className="flex-1 overflow-auto p-4 mt-0">
          <div className="space-y-3 mb-20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-foreground">Hearing Timeline</h3>
              <Button onClick={() => onNavigate('add-hearing')} size="sm">
                <Plus className="size-4 mr-1" />
                Add
              </Button>
            </div>

            {MOCK_HEARINGS.map((hearing, index) => (
              <div
                key={hearing.id}
                className="bg-card border border-border rounded-lg p-4 relative"
              >
                {index !== MOCK_HEARINGS.length - 1 && (
                  <div className="absolute left-4 top-full h-3 w-0.5 bg-border" />
                )}
                <div className="flex gap-3">
                  <div className={`size-2 rounded-full mt-2 shrink-0 ${
                    hearing.status === 'upcoming' ? 'bg-primary' : 'bg-muted-foreground'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="text-foreground">{hearing.purpose}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(hearing.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })} • {hearing.time}
                        </p>
                      </div>
                      <Badge className={
                        hearing.status === 'upcoming' 
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }>
                        {hearing.status}
                      </Badge>
                    </div>
                    {hearing.notes && (
                      <p className="text-sm text-muted-foreground">{hearing.notes}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="flex-1 overflow-auto p-4 mt-0">
          <div className="space-y-3 mb-20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-foreground">Documents</h3>
              <Button onClick={() => onNavigate('upload-document')} size="sm">
                <Plus className="size-4 mr-1" />
                Upload
              </Button>
            </div>

            {MOCK_DOCUMENTS.map((doc) => (
              <button
                key={doc.id}
                className="w-full bg-card border border-border rounded-lg p-4 text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="size-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground truncate">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {doc.type} • {doc.size} • {new Date(doc.uploadDate).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </TabsContent>

        {/* People Tab */}
        <TabsContent value="people" className="flex-1 overflow-auto p-4 mt-0">
          <div className="space-y-3 mb-20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-foreground">Associated People</h3>
              <Button onClick={() => onNavigate('add-person')} size="sm">
                <Plus className="size-4 mr-1" />
                Add
              </Button>
            </div>

            {MOCK_PEOPLE.map((person) => (
              <div
                key={person.id}
                className="bg-card border border-border rounded-lg p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-primary">{person.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground">{person.name}</p>
                    <p className="text-sm text-muted-foreground">{person.role}</p>
                    {person.phone !== 'N/A' && (
                      <p className="text-sm text-primary mt-1">{person.phone}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="flex-1 overflow-auto p-4 mt-0">
          <div className="space-y-3 mb-20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-foreground">Notes</h3>
              <Button size="sm">
                <Plus className="size-4 mr-1" />
                Add
              </Button>
            </div>

            {MOCK_NOTES.map((note) => (
              <div
                key={note.id}
                className="bg-card border border-border rounded-lg p-4"
              >
                <p className="text-foreground mb-2">{note.content}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(note.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
