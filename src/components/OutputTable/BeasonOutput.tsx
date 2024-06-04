import { Box, Flex, Paper, Text } from "@mantine/core";
import { Icon, IconProps } from "@tabler/icons-react";
import * as React from "react";
import styles from "./BeasonOutput.module.css";

interface IBeasonOutputProps {
  value: number | string;
  label?: string;
  format?: undefined;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  block?: boolean;
}

const BeasonOutput: React.FunctionComponent<IBeasonOutputProps> = (props) => {
  return props.block ? (
    <Paper p={"md"} className={styles.BeasonOutput}>
      <Flex direction="column" gap={8}>
        <props.icon />
        <Text c="gray">{props?.label}</Text>
        <Text className={styles.valueContainer}>{props.value}</Text>
      </Flex>
    </Paper>
  ) : (
    <Box className={styles.BeasonOutput}>
      <Text fz={12} c="gray">{props?.label}</Text>
      <Flex gap={5}>
        <props.icon />
        <Text className={styles.valueContainer}>{props.value}</Text>
      </Flex>
    </Box>
  );
};

export default BeasonOutput;
