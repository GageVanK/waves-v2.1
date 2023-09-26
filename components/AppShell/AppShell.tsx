import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Group,
} from '@mantine/core';
import { MantineNavBar } from './MantineNavBar';
import { MantineHeader } from './MantineHeader';
import { ReactNode } from 'react';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';

export const MantineAppShell = ({ children }: { children: ReactNode }) => {
  const theme = useMantineTheme();
 
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<MantineNavBar />}
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Group position="left">
          <ColorSchemeToggle />
          </Group>
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={<MantineHeader />}
    >
      {children}
    </AppShell>
  );
};
