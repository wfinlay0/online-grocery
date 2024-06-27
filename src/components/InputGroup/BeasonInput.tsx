import * as React from "react";
import {
  ActionIcon,
  Flex,
  NumberInput,
  NumberInputHandlers,
  NumberInputProps,
  useMantineTheme,
} from "@mantine/core";
import { IconPlus, IconMinus } from "@tabler/icons-react";

interface IBeasonInputProps extends NumberInputProps {}

const BeasonInput: React.FunctionComponent<IBeasonInputProps> = (props) => {
  const handlersRef = React.useRef<NumberInputHandlers>(null);
  const theme = useMantineTheme();

  return (
    <Flex align={"center"} gap={16} miw={172}>
      <ActionIcon
        variant="filled"
        radius={"xl"}
        onClick={() => handlersRef.current?.decrement()}
        color={theme.colors.gray[2]}
        disabled={props.disabled}
      >
        <IconMinus color={theme.colors.blue[5]} size={16} />
      </ActionIcon>
      <NumberInput
        hideControls
        maw={84}
        handlersRef={handlersRef}
        allowDecimal={false}
        allowNegative={false}
        styles={{
          input: {
            textAlign: "center",
          },
        }}
        {...props}
      />
      <ActionIcon
        variant="filled"
        radius={"xl"}
        onClick={() => handlersRef.current?.increment()}
        color={theme.colors.gray[2]}
        disabled={props.disabled}
      >
        <IconPlus color={theme.colors.blue[5]} size={16} />
      </ActionIcon>
    </Flex>
  );
};

export default BeasonInput;
