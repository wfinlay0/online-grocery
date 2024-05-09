import * as React from "react";
import Image from "next/image";
import nextConfig from "../../../next.config.mjs";
import { Flex } from "@mantine/core";

const GEARSET_GIF_URL = nextConfig.basePath + "/images/gearset.gif";

const CustomSpinner: React.FunctionComponent = () => {
  return (
    <Flex align={"center"} direction={"column"}>
      <Image src={GEARSET_GIF_URL} alt="loading" width={100} height={100} />
      <div>Crunching the numbers...</div>
    </Flex>
  );
};

export default CustomSpinner;
