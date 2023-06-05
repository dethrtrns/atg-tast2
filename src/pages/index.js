import UserList from "@/components/UserList";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>ATG-Task2</title>
        <meta
          name='description'
          content='ATG test task-2'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <UserList />
    </>
  );
}
