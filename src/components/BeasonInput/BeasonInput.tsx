import Image from "next/image";
import * as React from "react";
import {
  ActionIcon,
  Flex,
  NumberInput,
  NumberInputHandlers,
  NumberInputProps,
} from "@mantine/core";
import { IconPlus, IconMinus } from "@tabler/icons-react";

interface IBeasonInputProps extends NumberInputProps {}

const BeasonInput: React.FunctionComponent<IBeasonInputProps> = (props) => {
  const handlersRef = React.useRef<NumberInputHandlers>(null);

  return (
    <Flex align={"center"} gap={16}>
      <ActionIcon
        variant="filled"
        radius={"xl"}
        onClick={() => handlersRef.current?.decrement()}
      >
        <IconMinus></IconMinus>
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
      >
        <IconPlus></IconPlus>
      </ActionIcon>
    </Flex>
  );
};

export default BeasonInput;
