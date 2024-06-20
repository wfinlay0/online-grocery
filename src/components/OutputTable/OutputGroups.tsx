import * as React from "react";

import {
  Box,
  RenderTreeNodePayload,
  Title,
  TitleOrder,
  Tree,
  TreeNodeData,
  useTree,
} from "@mantine/core";

export interface IOutputGroupsProps {
  data: TreeNodeData[];
}

const Leaf = ({ node, elementProps, level }: RenderTreeNodePayload) => (
  <Box {...elementProps}>
    <Title order={(level + 3) as TitleOrder}>{node.label}</Title>
  </Box>
);

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
