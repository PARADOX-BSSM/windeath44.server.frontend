import * as _ from '@/applications/applicationList/alert/style.ts';
import MemorialBtn from '@/applications/components/memorialBtn';

interface AlertProps {
  icon: string;
  text: JSX.Element;
  onClick: () => any;
}

const Alert = ({ icon, text, onClick }: AlertProps) => {
  return (
    <_.main>
      <_.container>
        <_.place>
          <_.icon
            src={icon}
            alt="아이콘"
          ></_.icon>
          <_.text>{text}</_.text>
        </_.place>
        <_.btnContainer>
          <MemorialBtn
            name={'확인'}
            type="submit"
            active={true}
            onClick={onClick}
            widthPercent={12}
            heightPercent={4.5}
            fontSize="0.85rem"
          ></MemorialBtn>
        </_.btnContainer>
      </_.container>
    </_.main>
  );
};
export default Alert;
