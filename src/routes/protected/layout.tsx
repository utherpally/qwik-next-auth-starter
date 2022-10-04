import {
  component$,
  Slot,
  useContextProvider,
  useServerMount$,
  useStore,
} from "@builder.io/qwik";
import {
  DocumentHead,
  RequestHandler,
  useEndpoint,
} from "@builder.io/qwik-city";
import { getSession } from "../api/auth/[...nextauth]";
import { Session } from "../../auth";
import { SessionContext } from "./session-context";

export const onGet: RequestHandler<Session> = async (event) => {
  const session = await getSession(event);
  if (!session) {
    const { response, url } = event;
    throw response.redirect(`/api/auth/signin?callbackUrl=${url.pathname}`);
  }
  return session;
};

export default component$(() => {
  const sessionPromise = useEndpoint<typeof onGet>();
  const session = useStore<{ value: any | null }>({
    value: null,
  });

  useContextProvider(SessionContext, session);

  useServerMount$(async () => {
    session.value = await sessionPromise.promise;
  });

  return (
    <div class="protected">
      <Slot />
    </div>
  );
});

export const head: DocumentHead = ({ head }) => {
  return {
    title: `${head.title} - Documentation`,
  };
};
