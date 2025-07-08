import * as _ from "@/applications/applicationList/alert/style.ts";
import MemorialBtn from "@/applications/components/memorialBtn";
import Choten from "@/assets/profile/choten.svg";

interface AlertProps {
    onClick: () => any;
  }

const Alert = ({ onClick }: AlertProps) => {

    return(
        <_.main>
            <_.container>
                <_.place>
                    <_.icon src={Choten} alt="아이콘"></_.icon>
                    <_.text>문제가 발생했습니다.<br />에러가 발생했습니다.<br />예외가 발생했습니당.</_.text>
                </_.place>
                <_.btnContainer>
                    <MemorialBtn name={"확인"} type="submit" active={true} onClick={onClick}></MemorialBtn>
                </_.btnContainer>
            </_.container>
        </_.main>
    )
}
export default Alert;