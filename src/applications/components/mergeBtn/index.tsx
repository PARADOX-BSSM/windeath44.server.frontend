import * as _ from './style';
import { useCreateCharacter } from '@/api/anime/createCharacter';
import { inputPortage, inputContent } from '@/atoms/inputManager';
import { useAtomValue } from 'jotai';

interface PropsType {
  text: string;
}

const MergeBtn = ({ text }: PropsType) => {
  const inputValue = useAtomValue(inputPortage);
  const contentValue = useAtomValue(inputContent);
  const createCharacterMutation = useCreateCharacter();

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log({ ...inputValue, ...contentValue });
    createCharacterMutation.mutate({
      ...inputValue,
      ...contentValue,
    });
  };

  return <_.SubmitBtn onClick={handleSubmit}>{text}</_.SubmitBtn>;
};

export default MergeBtn;
