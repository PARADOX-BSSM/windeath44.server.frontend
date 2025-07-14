import Button from '@/applications/components/button';
interface Props {
  changeToLogIn: () => void;
}
const PasswordChange = ({ changeToLogIn }: Props) => {
  return (
    <div>
      <div>비밀번호 변경</div>
      <Button
        onClick={changeToLogIn}
        props="확인"
      />
    </div>
  );
};
export default PasswordChange;
