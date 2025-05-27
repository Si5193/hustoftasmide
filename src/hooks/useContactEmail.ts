
import { useState } from 'react';
import { useToast } from './use-toast';
import { supabase } from '@/integrations/supabase/client';

interface UploadedFile {
  name: string;
  url: string;
  size: number;
  type: string;
}

interface ContactFormData {
  name: string;
  contactPerson: string;
  email: string;
  message: string;
  customerType: string;
  attachments: UploadedFile[];
}

export const useContactEmail = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const sendContactEmail = async (formData: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      console.log('Sending contact email with data:', {
        name: formData.name,
        contactPerson: formData.contactPerson,
        email: formData.email,
        customerType: formData.customerType,
        attachmentsCount: formData.attachments.length,
        attachmentUrls: formData.attachments.map(file => file.url)
      });

      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          contactPerson: formData.contactPerson,
          email: formData.email,
          message: formData.message,
          customerType: formData.customerType,
          attachments: formData.attachments
        }
      });

      if (error) {
        console.error('Error from Edge Function:', error);
        throw error;
      }

      console.log('Email sent successfully:', data);
      
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
