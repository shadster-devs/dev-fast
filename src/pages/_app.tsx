import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {SessionProvider} from "next-auth/react";
import {ThemeProvider} from "@/components/Theme/ThemeProvider";

export default function App({ Component, pageProps }: AppProps) {
  return(
      <SessionProvider>
          <ThemeProvider>
              <Component {...pageProps} />
          </ThemeProvider>
      </SessionProvider>
      )
  ;
}
