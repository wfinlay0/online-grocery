// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import whartonLogo from "../../public/images/Wharton-Logo.png";

import {
  ColorSchemeScript,
  MantineProvider,
  AppShell,
  AppShellHeader,
  AppShellFooter,
  AppShellMain,
  Group,
  Flex,
  Image,
} from "@mantine/core";
// import Image from "next/image";
import Link from "next/link";
import nextConfig from "../../next.config.mjs";

export const metadata = {
  title: "online-grocery",
  description: "testing",
};

const WM_LOGO_URL = nextConfig.basePath + "/images/WestMonroe_Stroke_Black.png";
const WHARTON_LOGO_URL = nextConfig.basePath + "/images/Wharton-Logo.png";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ColorSchemeScript />
        <MantineProvider>
          <AppShell
            header={{ height: 60 }}
            footer={{ height: 60 }}
            padding="md"
          >
            <AppShellHeader>
              <Group h="100%" px="md">
                <Image
                  src={WHARTON_LOGO_URL} // Route of the image file
                  height={44} // Desired size with correct aspect ratio
                  width={173} // Desired size with correct aspect ratio
                  alt="Wharton University Logo"
                />
              </Group>
            </AppShellHeader>
            <AppShellMain>{children}</AppShellMain>
            <AppShellFooter style={{ position: "static" }}>
              <Flex justify={"center"} align={"center"} h={"100%"} gap={5}>
                Built by
                <Link href={"https://www.westmonroe.com/"}>
                  <Image
                    src={WM_LOGO_URL}
                    alt="West Monroe Partners Logo"
                    width={143}
                    height={25}
                  />
                </Link>
              </Flex>
            </AppShellFooter>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
