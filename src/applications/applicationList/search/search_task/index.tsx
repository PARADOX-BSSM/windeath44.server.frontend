import * as _ from './style';
import { useState } from 'react';
import Inputs from '@/applications/components/inputs';
import FilterBlock from '@/applications/components/filterBlock';

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
    '자살(自殺)',
    '타살(他殺)',
    '돌연사(突然死)',
    '불명사(不明死)',
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
            fontSize="16px"
            flex={false}
            label="이름"
            type="text"
            value={name}
            setValue={setName}
          />
          <Inputs
            width="100%"
            fontSize="16px"
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

export default Search_task;
