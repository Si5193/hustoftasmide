
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

const CTASection = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [customerType, setCustomerType] = useState('private');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Meddelande skickat!",
        description: "Vi återkommer till dig så snart som möjligt.",
      });
      
      // Reset form
      setName('');
      setContactPerson('');
      setEmail('');
      setMessage('');
      setCustomerType('private');
      setIsSubmitting(false);
      setOpen(false);
    }, 1000);
  };

  return (
    <>
      <section id="contact" className="bg-metal-800 py-16 text-white md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Redo att starta ditt projekt?
            </h2>
            <p className="mb-8 text-lg text-metal-300">
              Kontakta oss idag för en kostnadsfri konsultation. Vi hjälper dig att förverkliga dina idéer.
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => setOpen(true)}
                className="btn-primary bg-forge-500 hover:bg-forge-600 px-6 py-3 rounded-md font-medium"
              >
                Kontakta oss
              </button>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px] md:max-w-[600px] lg:max-w-[650px] max-h-[90vh] w-[90vw]">
          <DialogHeader>
            <DialogTitle>Kontakta oss</DialogTitle>
            <DialogDescription>
              Fyll i formuläret nedan så återkommer vi till dig så snart som möjligt.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh] pr-4">
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="space-y-3">
                <Label>Jag kontaktar som:</Label>
                <RadioGroup 
                  value={customerType} 
                  onValueChange={setCustomerType}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="private" />
                    <Label htmlFor="private" className="cursor-pointer">Privatperson</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="company" id="company" />
                    <Label htmlFor="company" className="cursor-pointer">Företag</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  {customerType === 'company' ? 'Företagsnamn' : 'Namn'}
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={customerType === 'company' ? 'Företagets namn' : 'Ditt namn'}
                  required
                />
              </div>
              
              {customerType === 'company' && (
                <div className="space-y-2">
                  <label htmlFor="contactPerson" className="block text-sm font-medium">
                    Kontaktperson
                  </label>
                  <Input
                    id="contactPerson"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Namn på kontaktperson"
                    required
                  />
                </div>
              )}
              
              <div className="space-y-2">
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
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">
                  Meddelande
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Beskriv ditt projekt eller fråga"
                  rows={4}
                  required
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
                >
                  Avbryt
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded bg-forge-500 px-4 py-2 text-white hover:bg-forge-600 disabled:opacity-70"
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
