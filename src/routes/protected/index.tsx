import { component$, useContext } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { SessionContext } from "./session-context";

export default component$(() => {
  const session = useContext(SessionContext);

  return (
    <>
      <p>Your session: {JSON.stringify(session)}</p>
      <a href="/api/auth/signout?callbackUrl=/"> Sign Out ?</a>
    </>
  );
});

export const head: DocumentHead = {
  title: "Protected Page",
};
