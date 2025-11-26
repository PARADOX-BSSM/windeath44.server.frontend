import * as _ from './style';

interface WhiteboardProps {
  children?: React.ReactNode;
  width?: string;
  height?: string;
  backgroundColor?: string;
}

const Whiteboard = ({ children, width, height, backgroundColor }: WhiteboardProps) => {
  return (
    <_.Container
      width={width}
      height={height}
    >
      <_.Shadow>
        <_.Inner backgroundColor={backgroundColor}>
          <_.Content backgroundColor={backgroundColor}>{children}</_.Content>
        </_.Inner>
      </_.Shadow>
    </_.Container>
  );
};

export default Whiteboard;
