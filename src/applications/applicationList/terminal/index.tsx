import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useQueue } from '@/hooks/dataStructure';
import { useGetUserMutation } from '@/api/user/getUser';

const Input = styled.input`
    background-color: none;
    padding: 0;
    margin: 0;
    border: none;
    width: 100%;
    height: 2rem;
    bottom: 5px;x
`;
const TerminalContent = styled.div`
  display: flex;
  align-items: flex-end;
  background-color: black;
  height: 100%;
  width: 100%;
`;

const Terminal = () => {
  const [command, setCommand] = useState('');
  const [history, Push, Pop] = useQueue();
  const { mutate: getUser, data, isPending, error } = useGetUserMutation();

  useEffect(() => {
    if (history.length > 100) {
      Pop();
    }
  }, [history]);

  return (
    <TerminalContent>
      <Input
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            console.log('enter');
            Push(e.target.value);
            console.log(history);
            e.target.value = '';
          }
          setCommand(e.target.value);
        }}
      ></Input>
      <button onClick={() => getUser('ilovecat')}>테스트용</button>
    </TerminalContent>
  );
};
export default Terminal;
