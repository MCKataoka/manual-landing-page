import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import QuizModal from '@/components/quiz/QuizModal';

export default function Home() {
  return (
      <>
        <main>
          <HeroSection />
          <ServicesSection />
        </main>
        <Footer />
        <QuizModal />
      </>
  );
}