import Option from '@/applications/components/option';
import Up from '@/assets/search/point_up.svg';
import Down from '@/assets/search/point_down.svg';
import * as _ from './style';

interface FilterBlockProps {
  label: string;
  option: string;
  isOpen: boolean;
  onClick: () => void;
  list: string[];
  onChange: (value: deathType) => void;
}

const FilterBlock = ({ label, option, isOpen, onClick, list, onChange }: FilterBlockProps) => {
  return (
    <_.filter_block>
      <_.Label>{label}</_.Label>
      <_.black>
        <_.white>
          <_.option>{option}</_.option>
          <_.button onClick={onClick}>
            <_.Button>
              <img
                src={isOpen ? Up : Down}
                alt={isOpen ? 'close' : 'open'}
              />
            </_.Button>
          </_.button>
        </_.white>
      </_.black>
      {isOpen && (
        <Option
          list={list}
          onChange={onChange}
        />
      )}
    </_.filter_block>
  );
};

export default FilterBlock;
