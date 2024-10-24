'use client'

import Navbar from "./components/Navbar";
import QuoteModal from "./components/QuoteModal";
import Footer from "@/components/Footer";
import { QuoteModalProvider, useQuoteModal } from "./contexts/QuoteModalContext";

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const { isQuoteModalOpen, closeQuoteModal } = useQuoteModal();

  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <QuoteModal isOpen={isQuoteModalOpen} onClose={closeQuoteModal} />
    </>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <QuoteModalProvider>
      <ClientLayoutContent>{children}</ClientLayoutContent>
    </QuoteModalProvider>
  );
}
