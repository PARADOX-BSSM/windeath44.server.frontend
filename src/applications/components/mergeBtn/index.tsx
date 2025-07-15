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
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(inputValue.date)) {
      alert('날짜 형식이 올바르지 않습니다. 예) 2023-04-12');
      return;
    }
    console.log({ ...inputValue, ...contentValue });
    createCharacterMutation.mutate({
      ...inputValue,
      ...contentValue,
    });
  };

  return <_.SubmitBtn onClick={handleSubmit}>{text}</_.SubmitBtn>;
};

export default MergeBtn;
