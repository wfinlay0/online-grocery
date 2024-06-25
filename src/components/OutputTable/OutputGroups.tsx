import * as React from "react";

import {
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
import { useMediaQuery } from "@mantine/hooks";

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
      onClick={undefined}
      style={{ cursor: "default" }}
    >
      <Title order={(level + 3) as TitleOrder} my={"md"} mr={"5px"}>
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
              value={`${Math.round(customFormat(nodeData[1][1]) * 100)}%`}
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
  const matches = useMediaQuery("(max-width: 600px)");

  React.useEffect(() => {
    tree.expandAllNodes();
  }, [props.data]);

  return (
    <Tree
      data={props.data}
      tree={tree}
      renderNode={(payload) => <Leaf {...payload} />}
      levelOffset={matches ? "5px" : "lg"}
    />
  );
};

export default OutputGroups;
