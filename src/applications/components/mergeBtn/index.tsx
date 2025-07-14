import * as _ from './style';

interface PropsType {
  text: string;
}

const MergeBtn = ({ text }: PropsType) => {
  return <_.SubmitBtn>{text}</_.SubmitBtn>;
};

export default MergeBtn;
