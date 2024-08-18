import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {SessionProvider} from "next-auth/react";
import {ThemeProvider} from "@/components/Theme/ThemeProvider";
import {ToastProvider} from "@/components/Toast/ToastProvider";
import Toast from "@/components/Toast/Toast";
import {ModalProvider} from "@/components/Modal/ModalProvider";
import DocumentProvider from "@/components/DocumentCards/DocumentProvider";
import NavBar from "@/components/NavBar/NavBar";

export default function App({ Component, pageProps }: AppProps) {
  return(
      <SessionProvider>
          <ThemeProvider>
              <ToastProvider>
                  <ModalProvider>
                      <DocumentProvider>
                              <NavBar/>
                              <Component {...pageProps} />
                      </DocumentProvider>
                  </ModalProvider>
              </ToastProvider>
          </ThemeProvider>
      </SessionProvider>
      )
  ;
}
