import Window from '@/assets/window.svg';
import * as _ from './style';
import { useEffect, useState } from 'react';
import { Number } from './style';
const Booting = () => {
  const [sideWidth, setSideWidth] = useState<number>(0);
  useEffect(() => {
    const updateSideWidth = () => {
      const fullWidth = window.innerWidth;
      const fullHeight = window.innerHeight;
      const containerWidth = (fullHeight * 4) / 3;
      const calculatedSide = (fullWidth - containerWidth) / 2;
      setSideWidth(Math.max(0, calculatedSide));
    };
    updateSideWidth();
    window.addEventListener('resize', updateSideWidth);
    return () => window.removeEventListener('resize', updateSideWidth);
  }, []);
  return (
    <_.Container>
      <_.BackgroundDiv width={sideWidth}></_.BackgroundDiv>
      <_.Main>
        <_.Info>
          <_.Image
            src={Window}
            alt={'Window'}
          />
          <_.Title>
            <_.Sub>Microsoft</_.Sub>
            <_.MainTexts>
              <_.Text>Windeath</_.Text>
              <_.Number>44</_.Number>
            </_.MainTexts>
          </_.Title>
        </_.Info>
        <_.Bar>0%</_.Bar>
      </_.Main>
      <_.BackgroundDiv width={sideWidth}></_.BackgroundDiv>
    </_.Container>
  );
};
export default Booting;
