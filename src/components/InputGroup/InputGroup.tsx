import { InputRow } from "@/types/xlsx-types";
import { getCellRangeValues } from "@/utils/xlsx-utils";
import { Button, NumberInput, Loader } from "@mantine/core";
import * as React from "react";
import { WorkBook, utils } from "xlsx";

/* potential refactor: generalize InputGroup further by adding a `readonly` boolean that would render it as such, would be able to get
 * rid of the OutputTable component completely, there is enough shared functionality. could also find some other clever
 * way to do the code splitting similar to extending a parent class. tbd
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
  onSubmit: (content: InputRow[]) => void;
  loading: boolean;
}

/**
 * renders number inputs with labels specified by a two column cell range in a sheet, also responsible for updating the
 * sheet/book and recalculating
 * @param props
 * @returns
 */
const InputGroup: React.FunctionComponent<IInputGroupProps> = (props) => {
  const [data, setData] = React.useState<InputRow[]>();
  // [ ] mantine use form

  React.useEffect(() => {
    const cellArray = getCellRangeValues(
      props.workbook?.Sheets[props.sheet],
      props.cellRange
    );
    const inputRows: InputRow[] = cellArray?.map((row) => [
      utils.format_cell(row[0]),
      parseInt(utils.format_cell(row[1])),
    ]);
    setData(inputRows);
  }, [props.cellRange, props.sheet, props.workbook, props.loading]);

  React.useEffect(() => {}, [props.loading]);

  const onInputChange = (newValue: string | number, rowIndex: number) => {
    setData((old) => {
      const tmp = old!.slice();
      tmp[rowIndex][1] = Number(newValue);
      return tmp;
    });
  };

  return (
    data && (
      <div>
        {data.map((row, idx) => (
          <div key={idx}>
            <NumberInput
              label={row[0]}
              value={row[1]}
              allowDecimal={false}
              allowNegative={false}
              onChange={(value) => onInputChange(value, idx)}
            />
          </div>
        ))}
        {props.loading ? (
          <Loader />
        ) : (
          <Button
            hidden={props.loading}
            my={"1em"}
            onClick={() => props.onSubmit(data)}
          >
            Submit
          </Button>
        )}
      </div>
    )
  );
};

export default InputGroup;
