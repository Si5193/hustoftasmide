
import React, { createContext, useContext, useState } from 'react';

interface ContactFormContextType {
  isContactFormOpen: boolean;
  openContactForm: () => void;
  closeContactForm: () => void;
}

const ContactFormContext = createContext<ContactFormContextType | undefined>(undefined);

export const useContactForm = () => {
  const context = useContext(ContactFormContext);
  if (context === undefined) {
    throw new Error('useContactForm must be used within a ContactFormProvider');
  }
  return context;
};

interface ContactFormProviderProps {
  children: React.ReactNode;
}

export const ContactFormProvider = ({ children }: ContactFormProviderProps) => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const openContactForm = () => setIsContactFormOpen(true);
  const closeContactForm = () => setIsContactFormOpen(false);

  return (
    <ContactFormContext.Provider
      value={{
        isContactFormOpen,
        openContactForm,
        closeContactForm,
      }}
    >
      {children}
    </ContactFormContext.Provider>
  );
};
