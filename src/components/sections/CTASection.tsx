
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Paperclip, X } from "lucide-react";
import { useContactEmail } from "@/hooks/useContactEmail";

const CTASection = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [customerType, setCustomerType] = useState('private');
  const [attachments, setAttachments] = useState<File[]>([]);
  const isMobile = useIsMobile();
  const { sendContactEmail, isSubmitting } = useContactEmail();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      name,
      contactPerson,
      email,
      message,
      customerType,
      attachments
    };

    const result = await sendContactEmail(formData);
    
    if (result.success) {
      // Reset form
      setName('');
      setContactPerson('');
      setEmail('');
      setMessage('');
      setCustomerType('private');
      setAttachments([]);
      setOpen(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...fileList]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <section id="contact" className="bg-metal-800 py-8 md:py-16 text-white">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl font-bold">
              Redo att starta ditt projekt?
            </h2>
            <p className="mb-6 md:mb-8 text-sm md:text-lg text-metal-300">
              Kontakta oss idag för en kostnadsfri konsultation.
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => setOpen(true)}
                className="btn-primary bg-forge-500 hover:bg-forge-600 px-6 py-3 rounded-md font-medium text-sm md:text-base min-h-[44px]"
              >
                Kontakta oss
              </button>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px] md:max-w-[600px] lg:max-w-[650px] max-h-[90vh] w-[95vw] sm:w-[90vw]">
          <DialogHeader>
            <DialogTitle className="text-base md:text-lg">Kontakta oss</DialogTitle>
            <DialogDescription className="text-sm">
              Fyll i formuläret så återkommer vi så snart som möjligt.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh] pr-2 md:pr-4">
            <form onSubmit={handleSubmit} className="mt-4 space-y-3 md:space-y-4">
              <div className="space-y-2 md:space-y-3">
                <Label className="text-sm">Jag kontaktar som:</Label>
                <RadioGroup 
                  value={customerType} 
                  onValueChange={setCustomerType}
                  className="flex space-x-4 md:space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="private" />
                    <Label htmlFor="private" className="cursor-pointer text-sm">Privatperson</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="company" id="company" />
                    <Label htmlFor="company" className="cursor-pointer text-sm">Företag</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-1 md:space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  {customerType === 'company' ? 'Företagsnamn' : 'Namn'}
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={customerType === 'company' ? 'Företagets namn' : 'Ditt namn'}
                  required
                  className="min-h-[44px]"
                />
              </div>
              
              {customerType === 'company' && (
                <div className="space-y-1 md:space-y-2">
                  <label htmlFor="contactPerson" className="block text-sm font-medium">
                    Kontaktperson
                  </label>
                  <Input
                    id="contactPerson"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Namn på kontaktperson"
                    required
                    className="min-h-[44px]"
                  />
                </div>
              )}
              
              <div className="space-y-1 md:space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  E-post
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="din.epost@exempel.se"
                  required
                  className="min-h-[44px]"
                />
              </div>
              
              <div className="space-y-1 md:space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">
                  Meddelande
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Beskriv ditt projekt eller fråga"
                  rows={3}
                  required
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="space-y-1 md:space-y-2">
                <label htmlFor="attachments" className="block text-sm font-medium">
                  Bifoga filer
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <label 
                    htmlFor="file-upload" 
                    className="flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent min-h-[44px]"
                  >
                    <Paperclip className="h-4 w-4" />
                    <span>Välj filer</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      multiple
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                
                {attachments.length > 0 && (
                  <div className="mt-2 space-y-2">
                    <p className="text-sm text-muted-foreground">Bifogade filer:</p>
                    <ul className="space-y-2">
                      {attachments.map((file, index) => (
                        <li 
                          key={`${file.name}-${index}`} 
                          className="flex items-center justify-between rounded-md border border-input px-3 py-2 text-sm min-h-[44px]"
                        >
                          <span className="truncate max-w-[80%]">{file.name}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeAttachment(index)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Ta bort</span>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 min-h-[44px] text-sm"
                >
                  Avbryt
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded bg-forge-500 px-4 py-2 text-white hover:bg-forge-600 disabled:opacity-70 min-h-[44px] text-sm"
                >
                  {isSubmitting ? 'Skickar...' : 'Skicka'}
                </button>
              </div>
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CTASection;
