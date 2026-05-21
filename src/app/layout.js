import { Poppins } from "next/font/google"; 
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextThemeProvider from "@/providers/NextThemeProvider";
import { Toaster } from "react-hot-toast";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Login - MediQueue",
  description: "Access your account to book sessions with expert tutors.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
    
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`min-h-full flex flex-col bg-background text-foreground font-sans`}>
        <NextThemeProvider>
          <Navbar />
          <main className="flex-grow"> 
            {children}
          </main>
          <Footer />
        </NextThemeProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}