import CautionImage from '@/assets/caution.svg';
import * as _ from './style';
import { useEffect, useState } from 'react';
type Props = {
  setIsCaution: (isCaution: boolean) => void;
};
const SPOILER_CAUTION_KEY = 'hasWarnedSession';
const Caution = ({ setIsCaution }: Props) => {
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
  const handleContinue = () => {
    sessionStorage.setItem(SPOILER_CAUTION_KEY, 'true');
    setIsCaution(false);
  };
  return (
    <_.Container>
      <_.BackgroundDiv width={sideWidth}></_.BackgroundDiv>
      <_.Main onClick={handleContinue}>
        <img src={CautionImage} />
      </_.Main>
      <_.BackgroundDiv width={sideWidth}></_.BackgroundDiv>
    </_.Container>
  );
};
export default Caution;
