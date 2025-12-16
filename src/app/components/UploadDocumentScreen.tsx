import { useState } from 'react';
import { ChevronLeft, Upload, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface UploadDocumentScreenProps {
  onBack: () => void;
  onSave: () => void;
}

export function UploadDocumentScreen({ onBack, onSave }: UploadDocumentScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    file: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        file,
        name: formData.name || file.name,
      });
    }
  };

  const handleSubmit = () => {
    onSave();
  };

  const isFormValid = formData.name && formData.file;

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="p-4 flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-muted rounded-lg">
            <ChevronLeft className="size-6 text-foreground" />
          </button>
          <h1 className="text-foreground">Upload Document</h1>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-6 max-w-2xl">
          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="file">Select Document *</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/50 transition-colors">
              <input
                id="file"
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="file" className="cursor-pointer">
                <div className="flex flex-col items-center gap-3">
                  <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Upload className="size-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground">Tap to select file</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                    </p>
                  </div>
                </div>
              </label>
            </div>

            {formData.file && (
              <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
                <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <FileText className="size-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground truncate">{formData.file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(formData.file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Document Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Document Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Property Deed"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-12 bg-input-background"
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
          Upload Document
        </Button>
      </div>
    </div>
  );
}
