import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface AddCaseScreenProps {
  onBack: () => void;
  onSave: () => void;
}

export function AddCaseScreen({ onBack, onSave }: AddCaseScreenProps) {
  const [formData, setFormData] = useState({
    title: '',
    caseNumber: '',
    client: '',
    court: '',
    caseType: '',
    description: '',
  });

  const handleSubmit = () => {
    onSave();
  };

  const isFormValid = formData.title && formData.caseNumber && formData.client && formData.court;

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="p-4 flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-muted rounded-lg">
            <ChevronLeft className="size-6 text-foreground" />
          </button>
          <h1 className="text-foreground">Add New Case</h1>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-6 max-w-2xl">
          {/* Case Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Case Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Property Dispute"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="h-12 bg-input-background"
            />
          </div>

          {/* Case Number */}
          <div className="space-y-2">
            <Label htmlFor="caseNumber">Case Number *</Label>
            <Input
              id="caseNumber"
              placeholder="e.g., CS 234/2024"
              value={formData.caseNumber}
              onChange={(e) => setFormData({ ...formData, caseNumber: e.target.value })}
              className="h-12 bg-input-background"
            />
          </div>

          {/* Client Name */}
          <div className="space-y-2">
            <Label htmlFor="client">Client Name *</Label>
            <Input
              id="client"
              placeholder="Enter client name"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="h-12 bg-input-background"
            />
          </div>

          {/* Court */}
          <div className="space-y-2">
            <Label htmlFor="court">Court *</Label>
            <Input
              id="court"
              placeholder="e.g., District Court, Delhi"
              value={formData.court}
              onChange={(e) => setFormData({ ...formData, court: e.target.value })}
              className="h-12 bg-input-background"
            />
          </div>

          {/* Case Type */}
          <div className="space-y-2">
            <Label htmlFor="caseType">Case Type</Label>
            <Select value={formData.caseType} onValueChange={(value) => setFormData({ ...formData, caseType: value })}>
              <SelectTrigger className="h-12 bg-input-background">
                <SelectValue placeholder="Select case type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="civil">Civil</SelectItem>
                <SelectItem value="criminal">Criminal</SelectItem>
                <SelectItem value="family">Family</SelectItem>
                <SelectItem value="consumer">Consumer</SelectItem>
                <SelectItem value="labor">Labor</SelectItem>
                <SelectItem value="property">Property</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief case description..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-24 bg-input-background"
              rows={4}
            />
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4">
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="w-full h-12"
          size="lg"
        >
          Add Case
        </Button>
      </div>
    </div>
  );
}
