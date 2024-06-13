import { Box, Table } from "@mantine/core";
import { TSubGroup } from "./OutputTable";

export interface IRecursiveSubGroupProps {
  data: TSubGroup;
}

const RecursiveSubGroup = (props: IRecursiveSubGroupProps) => {
  return (
    <Table>
      <Table.Tbody>
      </Table.Tbody>
    </Table>
  );
}

export default RecursiveSubGroup;