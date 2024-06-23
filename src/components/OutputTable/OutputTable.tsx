import {
  Box,
  LoadingOverlay,
  Paper,
  Text,
  Title,
  TreeNodeData,
} from "@mantine/core";
import * as React from "react";
import { CellObject, WorkBook, utils } from "xlsx";
import CustomSpinner from "./CustomSpinner";
import { SHEET_NAME } from "@/constants";
import OutputGroups from "./OutputGroups";

interface IOutputTableProps {
  workbook: WorkBook;
  sheet: string;
  cellRange: string;
  loading: boolean;
}

export type TSubGroup = Map<string, TSubGroup | CellObject>;

const ROW_KEY = "Fulfillment Approach";

const OutputTable: React.FunctionComponent<IOutputTableProps> = (props) => {
  const [groups, setGroups] = React.useState<TreeNodeData[]>([]);

  React.useEffect(() => {
    if (!props.workbook) return;

    const output: TreeNodeData[] = [];
    const xlData: any[] = utils
      .sheet_to_json(props.workbook?.Sheets[SHEET_NAME], {
        range: props.cellRange,
      })
      .sort((a, b) =>
        [a, b]
          .map((r: any) => r[ROW_KEY].split(" - ").length)
          .reduce((p, q) => p - q)
      );

    const columnKeys: string[] = Object.keys(xlData[1]);
    const rowKey = columnKeys[0];

    // for each row in the output
    for (const row of xlData) {
      // get a list of groups the row belongs to
      const groupNames: string[] = row[rowKey]
        .split(" - ")
        .map((v: string) => v.trim());
      let currentLevel: TreeNodeData[] | undefined = output;

      // for each group the row belongs to
      groupNames.forEach((groupName, idx) => {
        const nodePath = groupNames.slice(0, idx + 1).join(" - ");

        const newNode: TreeNodeData = {
          label: groupName,
          value: nodePath,
        };

        // if the node doesn't exist in the tree yet, add it
        if (!currentLevel?.find((node) => node.value === nodePath)) {
          // if it's a leaf, add the row data, else it's anoter subgroup
          if (idx === groupNames.length - 1) {
            newNode.nodeProps = row;
            delete newNode.nodeProps?.[rowKey];
          } else {
            newNode.children = [];
          }
          currentLevel?.push(newNode);
        }

        // continue on at the level down
        currentLevel = currentLevel?.find(
          (node) => node.value === nodePath
        )?.children;
      });
    }

    setGroups(output);
  }, [props.workbook, props.cellRange]);

  return (
    <Box pos={"relative"}>
      <Paper pos="relative" withBorder p={"lg"}>
        <Text tt="uppercase" c="gray">
          Calculation
        </Text>
        <Title order={2}>Fulfillment Time & Revenue</Title>
        <LoadingOverlay
          visible={props.loading}
          overlayProps={{ blur: 2 }}
          loaderProps={{ color: "gray.4" }}
        />
        <OutputGroups data={groups} />
      </Paper>
      <Text pos={"absolute"} c={"gray"} size="sm" m={5}>
        *Additional costs are associated with the Fulfillment Center approach,
        including last mile delivery and setting up separate facilities
      </Text>
    </Box>
  );
};

export default OutputTable;
