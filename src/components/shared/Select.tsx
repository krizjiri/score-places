import { MenuItem, Select as MuiSelect } from '@mui/material';

type SelectValue = string | number;

export type Option = {
  value: string | number;
  label?: string;
};

type Props<T extends SelectValue> = {
  value: T;
  options: Option[];
  onChange: (value: T) => void;
};

const Select = <T extends SelectValue>({
  options,
  value,
  onChange,
}: Props<T>) => {
  return (
    <MuiSelect
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={value}
      label="Age"
      onChange={(event) => onChange(event.target.value as T)}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </MuiSelect>
  );
};

export default Select;
