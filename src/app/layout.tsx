// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import {
  ColorSchemeScript,
  MantineProvider,
  AppShell,
  AppShellFooter,
  AppShellMain,
  Image,
  Text,
  Title,
  Overlay,
} from "@mantine/core";
// import Image from "next/image";
import Link from "next/link";
import nextConfig from "../../next.config.mjs";
import styles from "./layout.module.css";
import * as React from "react";

export const metadata = {
  title: "online-grocery",
  description: "testing",
};

const WM_LOGO_BLACK_URL =
  nextConfig.basePath + "/images/WestMonroe_Stroke_Black.png";
const BANNER_URL = nextConfig.basePath + "/images/banner.jpg";

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
              <div
                className={styles.wrapper}
                // using inline css because URL needs to change if basePath gets reconfigured
                style={{ backgroundImage: `url(${BANNER_URL})` }}
              >
                <Overlay
                  gradient="linear-gradient(180deg, #1e426a 9%, #244f84 18%, #2c4d9a 43%, #0a2136 150%)"
                  opacity={0.85}
                  zIndex={1}
                />
                <div className={styles.inner}>
                  <Title className={styles.title} ta={"center"}>
                    Online Grocery Picker Simulator
                  </Title>
                </div>
              </div>
              {children}
            </AppShellMain>
            <AppShellFooter style={{ position: "static" }}>
              <div className={styles.footer}>
                <Link href={"https://www.westmonroe.com/"}>
                  <Image
                    src={WM_LOGO_BLACK_URL}
                    alt="West Monroe Partners Logo"
                    maw={143}
                  />
                </Link>
                <Text size="xs" ta={"center"}>
                  &copy; 2024 West Monroe and The Wharton School. All Rights
                  Reserved
                </Text>
              </div>
            </AppShellFooter>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
