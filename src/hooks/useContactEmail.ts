
import { useState } from 'react';
import { useToast } from './use-toast';

interface ContactFormData {
  name: string;
  contactPerson: string;
  email: string;
  message: string;
  customerType: string;
  attachments: File[];
}

export const useContactEmail = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const sendContactEmail = async (formData: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // For now, we'll prepare the data for the Edge Function
      const emailData = {
        name: formData.name,
        contactPerson: formData.contactPerson,
        email: formData.email,
        message: formData.message,
        customerType: formData.customerType,
        attachments: formData.attachments.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type
        }))
      };

      // TODO: Replace this with actual Supabase Edge Function call
      // const { data, error } = await supabase.functions.invoke('send-contact-email', {
      //   body: emailData
      // });

      // Simulate the API call for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Email data prepared:', emailData);
      
      toast({
        title: "Meddelande skickat!",
        description: "Vi har mottagit ditt meddelande och återkommer så snart som möjligt.",
      });

      return { success: true };
    } catch (error) {
      console.error('Error sending contact email:', error);
      
      toast({
        title: "Fel vid skickning",
        description: "Något gick fel när meddelandet skulle skickas. Försök igen eller kontakta oss direkt.",
        variant: "destructive",
      });

      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    sendContactEmail,
    isSubmitting
  };
};
