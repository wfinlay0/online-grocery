import * as React from "react";

import {
  Box,
  Flex,
  RenderTreeNodePayload,
  Title,
  TitleOrder,
  Tree,
  TreeNodeData,
  useTree,
} from "@mantine/core";
import BeasonOutput from "./BeasonOutput/BeasonOutput";
import { IconClock, IconPremiumRights } from "@tabler/icons-react";
import { customFormat, timeFormat } from "@/utils/xlsx-utils";

export interface IOutputGroupsProps {
  data: TreeNodeData[];
}

const Leaf = ({ node, elementProps, level }: RenderTreeNodePayload) => {
  const nodeData = Object.entries(node.nodeProps ?? {});

  return (
    <Flex
      {...elementProps}
      justify={"space-between"}
      direction={level === 1 ? "column" : "row"}
    >
      <Title order={(level + 3) as TitleOrder} my={"sm"}>
        {node.label}
      </Title>
      {!!nodeData.length && (
        <Flex justify={"flex-start"} gap={"lg"}>
          <BeasonOutput
            value={timeFormat(customFormat(nodeData[0][1]))}
            icon={IconClock}
            block={level === 1}
            label={nodeData[0][0]}
          />
          {nodeData.length === 2 && (
            <BeasonOutput
              value={`${customFormat(nodeData[1][1]) * 100}%`}
              icon={IconPremiumRights}
              block={level === 1}
              label={nodeData[1][0]}
            />
          )}
        </Flex>
      )}
    </Flex>
  );
};

const OutputGroups = (props: IOutputGroupsProps) => {
  const tree = useTree({ initialExpandedState: {} });

  React.useEffect(() => {
    tree.expandAllNodes();
  }, [props.data]);

  return (
    <Tree
      data={props.data}
      tree={tree}
      renderNode={(payload) => <Leaf {...payload} />}
    />
  );
};

export default OutputGroups;
