import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  Tooltip,
  Space,
  getStylesRef,
  ActionIcon,
  Title,
  Badge,
} from '@mantine/core';
import Link from 'next/link';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBellRinging,
  IconUser,

  IconHome2,

  IconReceipt2,
  IconWallet,
  IconNotification,
} from '@tabler/icons-react';
import { ColorSchemeToggle } from './../ColorSchemeToggle/ColorSchemeToggle';
import { GiWaveCrest } from 'react-icons/gi';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
 

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  },

  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  betaTag: {
    alignItems: 'center',
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  
}));


const PAGES = [
  { link: '/', label: 'Home', icon: IconHome2 },
  { link: '/profile', label: 'Profile', icon: IconUser },
  { link: '/wallet', label: 'Wallet', icon: IconReceipt2 },
  { link: '/notifications', label: 'Notifications', icon: IconBellRinging },
 
];
export function MantineHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme, cx } = useStyles();
  const [active, setActive] = useState("Home");
  const links = PAGES.map((item) => (
    <Link
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        closeDrawer()
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <Box pb={5}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <Group>
        <Title className={classes.betaTag} order={1}  fs="italic" variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>Waves </Title>
<Badge variant="filled" color="blue" radius="sm" className={classes.betaTag}>BETA</Badge>
</Group>
          
            


          <Group sx={{ height: '100%', display: 'flex', justifyContent: 'center' }} className={classes.hiddenMobile} spacing={22} align="center">
          <Tooltip label="Home" withArrow  position="bottom" offset={3}>
          <ActionIcon
          component={Link}
          href="/"
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 360  }}
    >
      <IconHome2 />
    </ActionIcon>
    </Tooltip>
    <Tooltip label="Profile" withArrow  position="bottom" offset={3}>
    <ActionIcon
    component={Link}
    href="/profile"
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
    >
      <IconUser />
    </ActionIcon>
    </Tooltip>
    <Tooltip label="Wallet" withArrow  position="bottom" offset={3}>
    <ActionIcon
    component={Link}
    href="/wallet"
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 150  }}
    >
      <IconWallet />
    </ActionIcon>
    </Tooltip>
    <Tooltip label="Notifications" withArrow  position="bottom" offset={3}>
    <ActionIcon
    component={Link}
    href="/notifications"
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 270 }}
    >
      <IconBellRinging/>
    </ActionIcon>
    </Tooltip>
           </Group>

          <Group className={classes.hiddenMobile}>
         
            <Button variant="default">Log in</Button>
            <Button
              leftIcon={<GiWaveCrest size="1rem" />}
              variant="gradient"
              gradient={{ from: 'cyan', to: 'indigo' }}
            >
              Sign up
            </Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
        </Group>
        
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="77%"
        padding="md"
        title={
          <Title order={2} align="center"  fs="italic" variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>Waves</Title>
        }
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
          <Group p="md">
<ColorSchemeToggle/>
</Group>
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
          <Link href="/" className={classes.link} onClick={closeDrawer}> 
            <ActionIcon
   
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 270 }}
    >
      <IconHome2/>
    </ActionIcon>
    <Space w='md'/>
              Home
            </Link>
            <Space h='md'/>
            <Link href="/profile" className={classes.link} onClick={closeDrawer}> 
            <ActionIcon
   
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 270 }}
    >
      <IconUser/>
    </ActionIcon>
    <Space w='md'/>
              Profile
            </Link>
            <Space h='md'/>
            <Link href="/wallet" className={classes.link} onClick={closeDrawer}> 
            <ActionIcon
   
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 270 }}
    >
      <IconWallet/>
    </ActionIcon>
    <Space w='md'/>
              Wallet
            </Link>
            <Space h='md'/>
            <Link href="/notifications" className={classes.link} onClick={closeDrawer}> 
            <ActionIcon
   
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 270 }}
    >
      <IconBellRinging/>
    </ActionIcon>
    <Space w='md'/>
              Notifications
            </Link>
            <Space h='md'/>
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Group position="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button
              leftIcon={<GiWaveCrest size="1rem" />}
              variant="gradient"
              gradient={{ from: 'cyan', to: 'indigo' }}
            >
              Sign up
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
