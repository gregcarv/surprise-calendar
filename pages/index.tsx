import { Grid } from "@/components/Grid";
import { Wrapper } from "@/components/Wrapper";
import Head from "next/head";

export default function Home({ response }) {
  console.log(response);

  const numItems = process.env.NODE_ENV === "development" ? 1000 : 10000;

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
          <Grid numItems={numItems} />
        </Wrapper>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const response = "test";

  if (response) {
    return {
      props: {
        response,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
