import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Source_Sans_Pro, Libre_Baskerville } from "@next/font/google";
import { FirebaseDataContextProvider } from "@/contexts/firebase/firebaseDataContext";

const sourceSansPro = Source_Sans_Pro({
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${sourceSansPro.style.fontFamily};
        }

        h1,
        h2,
        h3,
        h4 {
          font-family: ${libreBaskerville.style.fontFamily};
        }
      `}</style>
      <FirebaseDataContextProvider>
        <Component {...pageProps} />
      </FirebaseDataContextProvider>
    </>
  );
}
