import * as _ from './style';
import { useApplyMemorial } from '@/api/memorial/applyMemorial';
import { inputPortage } from '@/atoms/inputManager';
import { useAtomValue } from 'jotai';

interface PropsType {
  text: string;
}

const MergeBtn = ({ text }: PropsType) => {
  const inputValue = useAtomValue(inputPortage);
  const applyMemorialMutation = useApplyMemorial();

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(inputValue);
    applyMemorialMutation.mutate(
      
    )
  };

  return <_.SubmitBtn onClick={handleSubmit}>{text}</_.SubmitBtn>;
};

export default MergeBtn;
