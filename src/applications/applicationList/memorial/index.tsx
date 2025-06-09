import * as _ from './style.ts';

const Memorial = () => {
    return(
        <_.Container>
            <_.InnerContainer>
                <_.TextContainer>
                    <_.Title>
                        최애의 사인
                    </_.Title>
                    <_.Version>
                        ver 0.0.1
                    </_.Version>
                </_.TextContainer>
                <_.MainContainer>
                    <_.DescriptionBox>
                        <_.Description>
                            최애의 사인은 작품 내에서 사망한 애니메이션 캐릭터를 추모하는 공간입니다.
                            <br/>오른쪽의 버튼을 눌러 계속 진행할 수 있습니다.
                        </_.Description>
                    </_.DescriptionBox>
                    <_.BtnWrapper>
                        <_.BtnInnerWrapper>
                            <_.Btn>추모관 검색</_.Btn>
                            <_.Btn>즐겨찾기</_.Btn>
                            <_.Btn>추모관 신청</_.Btn>
                        </_.BtnInnerWrapper>
                        <_.BtnVoid />
                    </_.BtnWrapper>
                </_.MainContainer>
                <_.Footer>
                    <_.Btn>입장하기</_.Btn>
                </_.Footer>
            </_.InnerContainer>
        </_.Container>
    )
}

export default Memorial;