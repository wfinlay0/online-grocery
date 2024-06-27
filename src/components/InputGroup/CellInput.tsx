import * as React from "react";
import BeasonInput from "./BeasonInput";
import { CellObject } from "xlsx";
import { NumberInputProps } from "@mantine/core";

interface ICellInputProps {
  row: CellObject[];
  onChange: (value: string | number) => void;
  disabled?: boolean;
  /**
   * overrides the value in row[1]
   */
  value?: number | string | undefined;
  /**
   * overrides the value in row[3]
   */
  max?: number;
}

const CellInput: React.FunctionComponent<ICellInputProps> = (props) => {
  const valueCell = props.row?.[1];
  const isDecimal =
    typeof valueCell?.z === "string" && valueCell.z.slice(-1) === "%";

  const onCellInputChange = (value: string | number) => {
    props.onChange(isDecimal ? (value as number) / 100 : value);
  };

  return (
    <BeasonInput
      value={props.value ?? (valueCell?.v as number) * (+isDecimal * 99 + 1)}
      allowNegative={false}
      onChange={onCellInputChange}
      suffix={isDecimal ? "%" : undefined}
      min={props.row[2]?.v as number}
      max={props.max ?? (props.row[3]?.v as number)}
      disabled={props.disabled}
    />
  );
};

export default CellInput;
