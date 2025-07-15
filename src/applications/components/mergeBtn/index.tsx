import * as _ from './style';
import { useApplyMemorial } from '@/api/memorial/applyMemorial';
import { inputPortage, inputContent } from '@/atoms/inputManager';
import { useAtomValue } from 'jotai';

interface PropsType {
  text: string;
}

const MergeBtn = ({ text }: PropsType) => {
  const inputValue = useAtomValue(inputPortage);
  const contentValue = useAtomValue(inputContent);
  const applyMemorialMutation = useApplyMemorial();

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log({ ...inputValue, ...contentValue });
    applyMemorialMutation.mutate({
      ...inputValue,
      ...contentValue,
    });
  };

  return <_.SubmitBtn onClick={handleSubmit}>{text}</_.SubmitBtn>;
};

export default MergeBtn;
