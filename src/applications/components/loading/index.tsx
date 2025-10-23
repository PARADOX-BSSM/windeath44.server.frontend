import * as _ from './style';
import LoadinguBig from '@/assets/loadingu_big.gif';

interface LoadingProps {
  text?: string;
  imageSize?: string;
}

const Loading = ({ text = '로딩중...', imageSize = '150px' }: LoadingProps) => {
  return (
    <_.LoadingContainer>
      <_.LoadingImage src={LoadinguBig} alt="로딩중" style={{ width: imageSize, height: imageSize }} />
      <_.LoadingText>{text}</_.LoadingText>
    </_.LoadingContainer>
  );
};

export default Loading;
