import { Box, Flex, Text } from "@mantine/core";
import { Icon, IconProps } from "@tabler/icons-react";
import * as React from "react";
import styles from "./BeasonOutput.module.css";

interface IBeasonOutputProps {
  value: number;
  label?: string;
  format?: undefined;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
}

const BeasonOutput: React.FunctionComponent<IBeasonOutputProps> = (props) => {
  return (
    <Flex className={styles.BeasonOutput} direction="column">
      <props.icon />
      <Text c="gray">{props?.label}</Text>
      <Text className={styles.valueContainer}>{props.value}</Text>
    </Flex>
  );
};

export default BeasonOutput;
