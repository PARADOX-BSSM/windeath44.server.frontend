import * as _ from '@/applications/applicationList/search/option/style.ts';
import { Dispatch } from 'react';
import { SetStateAction } from 'jotai/vanilla/typeUtils';
type OptionsProps = {
  list: string[];
  onChange: Dispatch<SetStateAction<string>>;
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
