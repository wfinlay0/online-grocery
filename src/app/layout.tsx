// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import {
  ColorSchemeScript,
  MantineProvider,
  AppShell,
  AppShellFooter,
  AppShellMain,
  Flex,
  Image,
  Text,
  Title,
  Overlay,
  Space,
} from "@mantine/core";
// import Image from "next/image";
import Link from "next/link";
import nextConfig from "../../next.config.mjs";
import styles from "./layout.module.css";

export const metadata = {
  title: "online-grocery",
  description: "testing",
};

const WM_LOGO_BLACK_URL =
  nextConfig.basePath + "/images/WestMonroe_Stroke_Black.png";
const WM_LOGO_URL = nextConfig.basePath + "/images/WestMonroe_Logo.png";
const BANNER_IMG_URL = nextConfig.basePath + "/images/banner.jpg";

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
          <AppShell footer={{ height: 60 }}>
            <AppShellMain>
              <div className={styles.wrapper}>
                <Overlay
                  gradient="linear-gradient(180deg, #1e426a 9%, #244f84 18%, #2c4d9a 43%, #0a2136 150%)"
                  opacity={0.85}
                  zIndex={1}
                />
                <div className={styles.inner}>
                  <Image src={WM_LOGO_URL} alt="WM Logo" maw={237} />
                  <Title className={styles.title}>
                    Grocery Store Picker Simulator
                  </Title>
                </div>
              </div>
              {children}
            </AppShellMain>
            <AppShellFooter style={{ position: "static" }}>
              <Flex
                justify={"space-between"}
                align={"center"}
                h={"100%"}
                p={20}
              >
                <Link href={"https://www.westmonroe.com/"}>
                  <Image
                    src={WM_LOGO_BLACK_URL}
                    alt="West Monroe Partners Logo"
                    width={143}
                    height={25}
                  />
                </Link>
                <Text>&copy; 2024 West Monroe. All Rights Reserved</Text>
              </Flex>
            </AppShellFooter>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
