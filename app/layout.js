import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import ScrollToTop from '@/components/ScrollToTop';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata = {
  title: 'United Career Solutions | Premium Hiring & Career Growth',
  description: 'Premium hiring and career growth brand helping candidates land full-time jobs in the US & UK and helping companies hire pre-vetted talent faster.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased text-brand-text bg-brand-bg relative min-h-screen flex flex-col">
        <ScrollToTop />
        <ScrollProgress />
        <Navbar />
        <main className="flex-grow flex flex-col pt-[80px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
