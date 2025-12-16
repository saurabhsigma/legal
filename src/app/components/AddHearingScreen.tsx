import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface AddHearingScreenProps {
  onBack: () => void;
  onSave: () => void;
}

export function AddHearingScreen({ onBack, onSave }: AddHearingScreenProps) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    purpose: '',
    notes: '',
  });

  const handleSubmit = () => {
    onSave();
  };

  const isFormValid = formData.date && formData.time && formData.purpose;

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="p-4 flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-muted rounded-lg">
            <ChevronLeft className="size-6 text-foreground" />
          </button>
          <h1 className="text-foreground">Add Hearing</h1>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-6 max-w-2xl">
          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Hearing Date *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="h-12 bg-input-background"
            />
          </div>

          {/* Time */}
          <div className="space-y-2">
            <Label htmlFor="time">Hearing Time *</Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="h-12 bg-input-background"
            />
          </div>

          {/* Purpose */}
          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose *</Label>
            <Input
              id="purpose"
              placeholder="e.g., Arguments, Evidence Submission"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              className="h-12 bg-input-background"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes or reminders..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
          Add Hearing
        </Button>
      </div>
    </div>
  );
}
