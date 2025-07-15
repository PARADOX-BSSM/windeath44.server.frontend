import * as _ from './style';

type OptionsProps = {
  list: string[];
  onChange: (value: string) => void;
};
const Option = ({ list, onChange }: OptionsProps) => {
  return (
    <_.option_set>
      <_.black>
        {list.map((item) => (
          <_.options
            key={item}
            onClick={() => onChange(item)}
          >
            {item}
          </_.options>
        ))}
      </_.black>
    </_.option_set>
  );
};
export default Option;
