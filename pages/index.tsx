import { Grid } from "@/components/Grid";
import { Wrapper } from "@/components/Wrapper";
import { firebaseConfig } from "@/config/firebaseConfig";
import Head from "next/head";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";
import { TdataEntry } from "@/types/data";
import { FirebaseDataContextProvider } from "@/contexts/firebase/firebaseDataContext";

export default function Home({ data }: { data: TdataEntry[] }) {
  return (
    <>
      <Head>
        <title>Surprise Calendar</title>
        <meta
          name="description"
          content="Surprise Calendar: pick & scratch your winning number"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Wrapper>
          <h1>
            Pick & scratch your number for a chance to win{" "}
            <strong>&euro; 25000</strong>
          </h1>
        </Wrapper>
        <Wrapper>
          <FirebaseDataContextProvider initialData={data}>
            <Grid />
          </FirebaseDataContextProvider>
        </Wrapper>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const firebaseApp = initializeApp(firebaseConfig);
  const dbRefName = "entries";
  const database = getDatabase(firebaseApp);
  const entries = ref(database, dbRefName);

  const data = await (await get(entries)).val();

  return {
    props: { data: data || [] },
  };
}
