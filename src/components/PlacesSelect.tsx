import { FC } from 'react';
import Select, { Option } from './shared/Select.tsx';

const PLACES_OPTIONS: Option[] = [
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'bakery', label: 'Bakery' },
  { value: 'cafe', label: 'Cafe' },
];

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const PlacesSelect: FC<Props> = ({ value, onChange }) => {
  return <Select options={PLACES_OPTIONS} value={value} onChange={onChange} />;
};

export default PlacesSelect;
