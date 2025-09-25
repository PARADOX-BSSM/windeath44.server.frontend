import * as _ from './style';
import Error from '@/../public/assets/cursor/cursor_block.svg';

export default function ErrorPage() {
  return (
    <_.Container>
      <_.ErrorImg
        src={Error}
        alt="Error"
      />
      <_.ErrorSet>
        <_.DemandSet>
          <_.informationSet>
            <_.DetaileCode>이 페이지는 모바일 기기에서 사용할 수 없습니다.</_.DetaileCode>
            <_.ErrorCode>403_MOBILE_ACCESS_DENIED</_.ErrorCode>
          </_.informationSet>
          <_.DetailResponseCode>이 페이지는 PC 환경에서만 접속 가능합니다.</_.DetailResponseCode>
        </_.DemandSet>
        <_.informationSet>
          <_.RequestText>계속하려면 PC에서 접속하세요</_.RequestText>
          <_.RequestText>문의 : paradox.windeath44@gmail.com</_.RequestText>
        </_.informationSet>
      </_.ErrorSet>
    </_.Container>
  );
}
