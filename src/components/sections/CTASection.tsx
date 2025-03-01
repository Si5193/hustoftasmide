
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
import { FacebookIcon } from "lucide-react";
import ChatWidget from "../ChatWidget";

const CTASection = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
      setEmail('');
      setMessage('');
      setIsSubmitting(false);
      setOpen(false);
    }, 1000);
  };

  const openMessenger = () => {
    // Replace this URL with the actual Facebook page messenger URL
    // Format is typically: https://m.me/[page-username]
    window.open('https://m.me/hustoftasmide', '_blank');
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
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center">
              <button 
                onClick={() => setOpen(true)}
                className="btn-primary bg-forge-500 hover:bg-forge-600 px-6 py-3 rounded-md font-medium"
              >
                Kontakta oss
              </button>
              <button 
                onClick={openMessenger}
                className="flex items-center justify-center space-x-2 bg-[#0084FF] hover:bg-[#0070db] text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                <FacebookIcon size={20} />
                <span>Messenger</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Kontakta oss</DialogTitle>
            <DialogDescription>
              Fyll i formuläret nedan så återkommer vi till dig så snart som möjligt.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Namn
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ditt namn"
                required
              />
            </div>
            
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
        </DialogContent>
      </Dialog>
      
      {/* Add the ChatWidget component */}
      <ChatWidget />
    </>
  );
};

export default CTASection;
