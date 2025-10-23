import * as _ from './style';
import LoadinguBig from '@/assets/loadingu_big.gif';

interface LoadingProps {
  text?: string;
  imageSize?: string;
  overlay?: boolean;
  color?: string;
}

const Loading = ({
  text = '로딩중...',
  imageSize = '150px',
  overlay = false,
  color = 'black',
}: LoadingProps) => {
  if (overlay) {
    return (
      <_.LoadingOverlay>
        <_.LoadingContent>
          <_.LoadingImage
            src={LoadinguBig}
            alt="로딩중"
            style={{ width: imageSize, height: imageSize }}
          />
          <_.LoadingText style={{ color: color }}>{text}</_.LoadingText>
        </_.LoadingContent>
      </_.LoadingOverlay>
    );
  }

  return (
    <_.LoadingContainer>
      <_.LoadingImage
        src={LoadinguBig}
        alt="로딩중"
        style={{ width: imageSize, height: imageSize }}
      />
      <_.LoadingText>{text}</_.LoadingText>
    </_.LoadingContainer>
  );
};

export default Loading;
