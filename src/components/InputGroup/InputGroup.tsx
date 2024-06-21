import { getCellRangeValues } from "@/utils/xlsx-utils";
import { Box, Button, Flex, Table, Title } from "@mantine/core";
import * as React from "react";
import { CellObject, WorkBook, utils } from "xlsx";
import { IconHelp } from "@tabler/icons-react";
import styles from "./InputGroup.module.css";
import CellInput from "./CellInput";

/* potential refactor: generalize InputGroup further by adding a `readonly` boolean that would render it as such, would
 * be able to get rid of the OutputTable component completely, there is enough shared functionality. could also find
 * some other clever way to do the code splitting similar to extending a parent class. tbd
 */
interface IInputGroupProps {
  workbook: WorkBook;
  sheet: string;
  /**
   * a string representing a cell range e.g. `"B9:C14"`
   * - two columns will be interpreted as a column of labels and a column of numbers
   * - one column will be interpreted simply as a column of numbers
   * - if more than 2 colums, won't throw an error, but only first 2 will be considered
   */
  cellRange: string;
  /**
   *
   * @param content
   * @param origin the cell where the content should be reinserted (top left of the range)
   * @returns
   */
  onSubmit: (content: CellObject[][], origin: string) => void;
  loading: boolean;
}

export type InputRow = {
  label: string;
  value: number;
};

/**
 * renders number inputs with labels specified by a two column cell range in a sheet, also responsible for updating the
 * sheet/book and recalculating
 * @param props
 * @returns
 */
const InputGroup: React.FunctionComponent<IInputGroupProps> = (props) => {
  const [data, setData] = React.useState<CellObject[][]>();
  // [ ] mantine use form

  React.useEffect(() => {
    const inputRows = getCellRangeValues(
      props.workbook?.Sheets[props.sheet],
      props.cellRange
    );

    setData(inputRows);
  }, [props.cellRange, props.sheet, props.workbook]);

  const onInputChange = (newValue: string | number, rowIndex: number) => {
    setData((old) => {
      const tmp = old!.slice();
      tmp[rowIndex][1].v = Number(newValue);
      return tmp;
    });
  };

  return (
    data && (
      <Box className={styles.InputGroup}>
        <Title order={2}>Make Your Selections</Title>
        <Table>
          <Table.Tbody>
            {data.map((row, idx) => (
              <Table.Tr key={idx}>
                <Table.Td>
                  <Flex justify={"space-between"} py={"xs"} wrap={"wrap"}>
                    <Flex align={"center"} miw={300} py={"xs"}>
                      {utils.format_cell(row[0])}&nbsp;
                      <Flex align={"center"}>
                        <IconHelp size={17} color="lightgray" />
                      </Flex>
                    </Flex>
                    <CellInput
                      row={row}
                      onChange={(value) => onInputChange(value, idx)}
                    />
                  </Flex>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <Flex justify={"flex-end"}>
          <Button
            className={styles.wmButton}
            my={"1em"}
            onClick={() => props.onSubmit(data, props.cellRange.split(":")[0])}
            disabled={props.loading}
          >
            Calculate
          </Button>
        </Flex>
      </Box>
    )
  );
};

export default InputGroup;
