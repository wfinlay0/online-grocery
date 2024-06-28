import * as React from "react";
import {
  ActionIcon,
  Flex,
  NumberInput,
  NumberInputHandlers,
  NumberInputProps,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { IconPlus, IconMinus } from "@tabler/icons-react";

export interface IBeasonInputProps extends NumberInputProps {
  toolTip?: string;
}

const WithToolTip = ({ tooltip, children }: { tooltip: string | undefined, children: React.ReactNode }) => (
  tooltip ? <Tooltip label={tooltip}>{children}</Tooltip> : children
);

const BeasonInput: React.FunctionComponent<IBeasonInputProps> = (props) => {
  const handlersRef = React.useRef<NumberInputHandlers>(null);
  const theme = useMantineTheme();

  return (
    <WithToolTip tooltip={props.toolTip}>
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
    </WithToolTip>
  );
};

export default BeasonInput;
