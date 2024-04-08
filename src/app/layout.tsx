// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import nextConfig from "../../next.config.mjs";
import whartonLogo from '../../public/images/Wharton-Logo.png';


import { 
  ColorSchemeScript, 
  MantineProvider, 
  AppShell, 
  AppShellHeader,
  AppShellFooter,
  AppShellSection,
  AppShellMain,
  Anchor,
  Group 
} from "@mantine/core";
import Image from 'next/image';

export const metadata = {
  title: "online-grocery",
  description: "testing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ColorSchemeScript/>
      <MantineProvider>
        <AppShell
          header={{ height: 60 }}
          footer={{ height: 60 }}
          padding="md"
        >
          <AppShellHeader>
            <Group h="100%" px="md">
            <Image
              src={whartonLogo}// Route of the image file
              height={44} // Desired size with correct aspect ratio
              width={173} // Desired size with correct aspect ratio
              alt="Your Name"
            />
            </Group>
          </AppShellHeader>
          <AppShellMain>
            {children}
          </AppShellMain>
          <AppShellFooter style={{position: "static"}}>
            <Group h="100%" px="md" justify="center">
              <span>
                Built by <a style={{color: "inherit"}} href="https://www.westmonroe.com/" target="_blank">West Monroe</a>
              </span>
            </Group>
          </AppShellFooter>
        </AppShell>
      </MantineProvider>
    </>

    
  );
}
