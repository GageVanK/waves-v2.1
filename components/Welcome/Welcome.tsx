import {
  createStyles,
  Card,
  Center,
  Title,
  Text,
  List,
  ThemeIcon,
  Group,
  Button,
  Divider,
  Container,
  SimpleGrid, rem,
  Space
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { ERROR_TYPES, identity } from "deso-protocol";
import { GiWaveCrest } from "react-icons/gi";
import { VscLink } from "react-icons/vsc";
import { BiWorld } from "react-icons/bi";
import { MdOutlineAttachMoney } from "react-icons/md";
import {Slide} from "react-awesome-reveal";
import { RiDatabaseLine } from "react-icons/ri";
import { GiReceiveMoney } from "react-icons/gi";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import { PiUsersThreeDuotone } from "react-icons/pi";
import { ReactElement } from 'react';


import { GiBigWave } from 'react-icons/gi';
const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
  },

  content: {
    maxWidth: 480,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  wrapper: {
    paddingTop: `calc(var(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(var(${theme.spacing.xl} * 4)`,
  },

  title: {
    fontWeight: 900,
  },

  root: {
    margin: '0 auto',
    maxWidth: '1000px',
  },

}));


export const MOCKDATA = [
  {
    icon: GiBigWave,
    title: 'Why Waves?',
    description:
      'Waves is not a shitcoin. Waves leverages the true power of Crypto and Blockchain technology via the DeSo Blockchain to provide real utility to Streamers!',
  },
  {
    icon: RiDatabaseLine,
    title: 'On-Chain Storage',
    description:
      'Waves is built on the DeSo Blockchain, offering an alternative to private, centralized databases. It enables transparent data allowing users as much access as the builders. Traditional social platforms often use private data to sell to advertisers, but Waves provides a storage alternative to mitigate this practice.',
  },
  {
    icon: BiWorld,
    title: 'Open Source',
    description:
      'Waves is open source and allows for Algorithm Audits, eliminating guesswork around the magic algorithm.',
  },
  {
    icon: MdOutlineAttachMoney,
    title: 'Monetization',
    description:
      'Waves is powered by Deso Wallets, enabling instant Fan-to-Creator Subscription payments. No more jumping through hoops to monetize your content. Currently, Waves pays out 100% directly to creators. Future Waves versions may take up to 20% for platform expenses.',
  },
  {
    icon: RiCheckboxMultipleLine,
    title: 'Multi-Platform Streaming',
    description:
      'Waves aims to empower streamers by providing tools to stream to multiple platforms right from your Waves Dashboard, maxmizing your audience. Currently, waves supports multistreaming to YouTube, Kick, and Twitch. Additional platforms can be added upon request.',
  },
  {
    icon: PiUsersThreeDuotone,
    title: 'Community Oriented',
    description:
      'Waves prioritizes user experience and plans to democratize social media through on-chain voting to determine feature development and the platforms direction.',
  },
  {
    icon: VscLink,
    title: 'Blockchain Social',
    description:
      'Waves leverages blockchain technology to facilitate interoperability between platforms, ensuring that your content remains accessible across all Deso Apps and is Censorship Resistant.',
  },
  {
    icon: GiReceiveMoney,
    title: 'NFT Streams & Clips',
    description:
      'Future versions of Waves will support NFT Streams and Clips, giving streamers greater longevity and complete control over pricing and royalty percentages of any future sales of the NFT.',
  },
];

export function Feature({ icon, title, description }: { icon: ReactElement, title: string, description: string }) {
  return (
    <>
    <div >
      <Center>
      <ThemeIcon variant="light" size={50} radius={40}>
        <Icon style={{ width: rem(25), height: rem(25) }} stroke={1.5} />
      </ThemeIcon>
      </Center>
      <Center>
      <Text fw={500} mt="sm" mb={7}>
        {title}
      </Text>
      </Center>
      <Center>
      <Text size="sm" c="dimmed" lh={1.6}>
        {description}
      </Text>
      </Center>
    </div>
    <Space h={44}/>
    </>
  );
} 

export function Welcome() {
  const { classes } = useStyles();
  const features = MOCKDATA.map((feature, index) => <Feature {...feature} key={index} />);

  return (
   <>
      
      <Title className={classes.title} align="center"  fs="italic" variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>Waves</Title>
<Space h="sm"/>
<Container size={560} p={0}>
  <Text size="md" fw={700} c="dimmed" align="center">
    Decentralized Live Streaming
  </Text>
</Container>
<Divider my="sm" />

<SimpleGrid
  mt={60}
  cols={{ base: 1, sm: 2, md: 3 }}
  spacing={{ base: 'xl', md: 50 }}
  verticalSpacing={{ base: 'xl', md: 50 }}
  className={classes.root}
>
  <Slide>
  {features}
  </Slide>
</SimpleGrid>
        
<Space h="xs"/>

          
      
      <Group spacing="xs" grow   className={classes.root}>
        

        <Button
          leftIcon={<GiWaveCrest size="1rem" />}
          variant="gradient"
          radius="lg"
          gradient={{ from: "cyan", to: "indigo" }}
          onClick={() => {
            identity
              .login({
                getFreeDeso: true,
              })
              .catch((err) => {
                if (err?.type === ERROR_TYPES.NO_MONEY) {
                  alert("You need DESO in order to post!");
                } else {
                  alert(err);
                }
              });
          }}
        >
          Sign Up
        </Button>
      </Group>
      </>
  );
}
