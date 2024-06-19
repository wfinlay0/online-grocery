import { Tree, TreeNodeData } from "@mantine/core";

export interface IOutputGroupsProps {
  data: TreeNodeData[];
}

const OutputGroups = (props: IOutputGroupsProps) => {
  return <Tree data={props.data} />;
};

export default OutputGroups;
