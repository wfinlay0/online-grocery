import * as React from "react";
import { CellObject, WorkBook, utils } from "xlsx";

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
  onSubmit: (content: WorkBook) => void;
}

/**
 * renders number inputs with labels specified by a two column cell range in a sheet, also responsible for updating the
 * sheet/book and recalculating
 * @param props
 * @returns
 */
const InputGroup: React.FunctionComponent<IInputGroupProps> = (props) => {
  const [data, setData] = React.useState<CellObject[][]>();

  React.useEffect(() => {
    const cr = utils.decode_range(props.cellRange);
    setData(
      props.workbook?.Sheets[props.sheet]["!data"]
        ?.slice(cr.s.r, cr.e.r + 1)
        .map((row) => row.slice(cr.s.c, cr.e.c + 1))
    );
  }, [props.cellRange, props.sheet, props.workbook]);

  const onInputChange = () => {
    console.error("not yet implemented: TODO: update data (inputgroup state)");
  };

  return (
    <div>
      {data?.map((row, idx) => (
        <div key={idx}>
          <label>
            {utils.format_cell(row[0])}
            <input
              type="text"
              value={utils.format_cell(row[1])}
              onChange={onInputChange}
            />
          </label>
        </div>
      ))}
      <button>submit</button>
    </div>
  );
};

export default InputGroup;
