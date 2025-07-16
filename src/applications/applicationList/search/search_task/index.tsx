import * as _ from './style';
import Up from '@/assets/search/point_up.svg';
import Down from '@/assets/search/point_down.svg';
import { Dispatch, useState } from 'react';
import Option from '@/applications/applicationList/search/option';
import { SetStateAction } from 'react';
import Inputs from '@/applications/components/inputs';

interface FilterBlockProps {
  label: string;
  option: string;
  isOpen: boolean;
  onClick: () => void;
  list: string[];
  onChange: Dispatch<SetStateAction<string>>;
}

interface SerachTaskProps {
  fillDeath: string;
  setFillDeath: (item: SetStateAction<string>) => void;
  ani: string;
  setAni: (item: SetStateAction<string>) => void;
  name: string;
  setName: (item: SetStateAction<string>) => void;
}

const Search_task = ({ fillDeath, setFillDeath, ani, setAni, name, setName }: SerachTaskProps) => {
  const [death, setDeath] = useState(false);

  const deathReason = [
    '모두',
    '자연사(自然死)',
    '병사(病死)',
    '돌연사(突然死)',
    '자살(自殺)',
    '불명사(不明死)',
    '타살(他殺)',
  ];

  const handleDeath = () => {
    setDeath(!death);
  };
  return (
    <_.search>
      <_.styles>
        <_.search_main>
          <Inputs
            width="100%"
            fontSize="0.8rem"
            flex={false}
            label="이름"
            type="text"
            value={name}
            setValue={setName}
          />
          <Inputs
            width="100%"
            fontSize="0.8rem"
            flex={false}
            label="애니메이션"
            type="text"
            value={ani}
            setValue={setAni}
          />

          <FilterBlock
            label="사인"
            option={fillDeath}
            isOpen={death}
            onClick={handleDeath}
            list={deathReason}
            onChange={(value) => {
              setFillDeath(value);
              setDeath(false);
            }}
          />
        </_.search_main>
      </_.styles>
    </_.search>
  );
};

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
export default Search_task;
