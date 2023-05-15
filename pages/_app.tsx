import { useEffect, useState } from 'react';
import NextApp, { AppProps, AppContext } from 'next/app';
import { configure, getUsersStateless, identity, NOTIFICATION_EVENTS } from 'deso-protocol';
import { UserContext } from '../contexts';
import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { MantineAppShell } from '../components/AppShell/AppShell';

configure({
  spendingLimitOptions: {
    GlobalDESOLimit: 10000000, // 0.01 DESO
    TransactionCountLimitMap: {
      SUBMIT_POST: 'UNLIMITED',
    },
  },
});

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  const [userState, setUserState] = useState({
    currentUser: null,
    alternateUsers: null,
    isLoading: true,
  });

  useEffect(
    () => {
      identity.subscribe(({ event, currentUser, alternateUsers }) => {
        if (event === NOTIFICATION_EVENTS.AUTHORIZE_DERIVED_KEY_START) {
          setUserState((state) => ({ ...state, isLoading: true }));
          return;
        }

        if (alternateUsers && !currentUser) {
          const fallbackUser = Object.values(alternateUsers)[0];
          identity.setActiveUser(fallbackUser.publicKey);

          return;
        }

        if (!currentUser) {
          setUserState((state) => ({
            ...state,
            currentUser: null,
            isLoading: false,
          }));
        } else if (currentUser !== userState.currentUser) {
          const alternateUserKeys =
            Object.values(alternateUsers ?? {})?.map((u) => u.publicKey) ?? [];

          setUserState((state) => ({
            ...state,
            isLoading: true,
          }));

          getUsersStateless({
            PublicKeysBase58Check: [currentUser.publicKey, ...alternateUserKeys],
            IncludeBalance: true,
          })
            .then(({ UserList }: any) => {
              const [currentUser, ...alternateUsers] = UserList;
              setUserState((state) => ({
                ...state,
                currentUser,
                alternateUsers,
              }));
            })
            .finally(() =>
              setUserState((state) => ({
                ...state,
                isLoading: false,
              }))
            );
        }
      });
    },
    [] /* NOTE: We pass an empty array to useEffect so that it only runs once for our entire app session */
  );
  return (
    <>
      <Head>
        <title>Mantine next example</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <MantineAppShell>
            <Component {...pageProps} />
            <Notifications />
          </MantineAppShell>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',
  };
};
