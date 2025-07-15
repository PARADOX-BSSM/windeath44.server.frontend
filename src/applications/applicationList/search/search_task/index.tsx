import * as _ from './style';
import { useState } from 'react';
import Inputs from '@/applications/components/inputs';
import FilterBlock from '@/applications/components/filterBlock';

const Search_task = () => {
  const [animation, setAnimation] = useState(false);
  const [death, setDeath] = useState(false);

  const [fillDeath, setFillDeath] = useState('모두');
  const [fillAni, setFillAni] = useState('없음');

  const [name, setName] = useState('');
  const deathReason = [
    '모두',
    '자연사(自然死)',
    '병사(病死)',
    '자살(自殺)',
    '불명사(不明死)',
    '타살(他殺)',
    '돌연사(突然死)',
  ];
  const animationType = [
    '없음',
    '모두 (스포일러 주의!)',
    '최애의 아이',
    '데스노트',
    '원피스',
    '도쿄구울',
  ];

  const handleAnimation = () => {
    setAnimation(!animation);
  };
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
          <FilterBlock
            label="애니메이션"
            option={fillAni}
            isOpen={animation}
            onClick={handleAnimation}
            list={animationType}
            onChange={(value) => {
              setFillAni(value);
              setAnimation(false);
            }}
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
