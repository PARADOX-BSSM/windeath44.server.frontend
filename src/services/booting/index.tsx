import Window from '@/assets/window.svg';
import * as _ from './style';
import { useEffect, useState } from 'react';
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
        <div>
          <img
            src={Window}
            alt={'Window'}
          />
          <div>
            <div>Microsoft</div>
            <div>
              <span>Windeath</span>
              <span>44</span>
            </div>
          </div>
        </div>
        <div>바</div>
      </_.Main>
      <_.BackgroundDiv width={sideWidth}></_.BackgroundDiv>
    </_.Container>
  );
};
export default Booting;
