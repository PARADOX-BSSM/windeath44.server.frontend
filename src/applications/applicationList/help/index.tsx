import * as _ from './style';
import { useState } from 'react';

const Help = () => {
  const [isClick, setClick] = useState<number>(0);
  const tagList = ['<목차></목차>', '<동영상></동영상>', '<강조></강조>', '</다음>'];
  const handleClick = (index: number) => {
    setClick(index);
  };
  return (
    <_.Container>
      <_.Main>
        <_.Contents url={isClick} />
        <_.Locate>
          <_.TagSet>
            {tagList.map((item, index) => (
              <_.Tag
                key={index}
                onClick={() => handleClick(index)}
              >
                {item}
              </_.Tag>
            ))}
          </_.TagSet>
          <_.Character />
        </_.Locate>
      </_.Main>
    </_.Container>
  );
};
export default Help;
