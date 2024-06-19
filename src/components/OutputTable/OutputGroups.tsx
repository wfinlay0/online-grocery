import { Box, Table, Title, TitleOrder } from "@mantine/core";
import { TSubGroup } from "./OutputTable";
import { clamp } from "@mantine/hooks";

export interface IOutputGroupsProps {
  data: TSubGroup;
  /**
   * What level of the tree we're at. Begins at 0
   */
  depth?: number;
}

const OutputGroups = (props: IOutputGroupsProps) => {
  return (
    <Box>
      {Array.from(props.data.keys()).map((groupName, idx) => (
        <Box key={idx}>
          <Title order={clamp((props.depth ?? 1) + 3, 1, 6) as TitleOrder}>
            {groupName}
          </Title>
        </Box>
      ))}
    </Box>
  );
};

export default OutputGroups;
