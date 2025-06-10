import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import QuizModal from '@/components/quiz/QuizModal';
import Header from "@/components/layout/Header";

export default function Home() {
  return (
      <><Header />
        <main>
          <HeroSection />
          <ServicesSection />
        </main>
        <Footer />
        <QuizModal />
      </>
  );
}