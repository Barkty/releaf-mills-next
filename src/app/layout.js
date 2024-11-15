import "./globals.css";
import { Poppins } from 'next/font/google'
import { ToastContainer } from 'react-toastify';
import TanstackProvider from '@/providers/tanstack'
import 'react-toastify/dist/ReactToastify.css';
import { NextUIProvider } from '@nextui-org/react';
import Loader from "@/utils/loader";

const poppins = Poppins({ subsets: ['latin'], weight: ["400", "600", '700' ] })

export const metadata = {
  title: "Releaf",
  description: "Industrialising food processing in Africa. We're using technology to scale Africa's agricultural sector and making it more rewarding for all its stakeholders including farmers, food factories, and consumers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextUIProvider>
          <TanstackProvider>
            <Loader />
            {children}
            <ToastContainer />
          </TanstackProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
