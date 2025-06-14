import * as _ from './style';

const MemorialCommit = () => {
    return(
        <_.Container>
            <_.Section1>
                <_.Header>
                    <_.HeaderTextContainer>
                        <_.CharacterName>호시노 아이</_.CharacterName>
                        <_.Status>문서 수정 중</_.Status>
                    </_.HeaderTextContainer>
                    <_.AuthorshipFrom>@winshine1034의 수정 요청</_.AuthorshipFrom>
                </_.Header>
                <_.CharacterProfileContainer>
                    <_.CharacterProfileInnerContainer>
                        <_.CharacterProfileBox>
                            <_.CharacterProfile>
                                <_.CharacterProfileImg />
                                <_.CharacterProfileName>호시노 아이</_.CharacterProfileName>
                            </_.CharacterProfile>

                            <_.CharacterInformation>
                                <_.CharacterInformationInner>
                                    <_.CharacterInformationRow>
                                        <_.CharacterInformationRowAttribute>
                                            <_.CharacterInformationRowAttributeText>나이</_.CharacterInformationRowAttributeText>
                                        </_.CharacterInformationRowAttribute>
                                        <_.CharacterInformationRowValue>
                                            <_.CharacterInformationRowValueText>향년 20세</_.CharacterInformationRowValueText>
                                        </_.CharacterInformationRowValue>
                                    </_.CharacterInformationRow>

                                    <_.CharacterInformationRow>
                                        <_.CharacterInformationRowAttribute>
                                            <_.CharacterInformationRowAttributeText>사망 날짜</_.CharacterInformationRowAttributeText>
                                        </_.CharacterInformationRowAttribute>
                                        <_.CharacterInformationRowValue>
                                            <_.CharacterInformationRowValueText>2023.04.12</_.CharacterInformationRowValueText>
                                        </_.CharacterInformationRowValue>
                                    </_.CharacterInformationRow>

                                    <_.CharacterInformationRow>
                                        <_.CharacterInformationRowAttribute>
                                            <_.CharacterInformationRowAttributeText>생존 기간</_.CharacterInformationRowAttributeText>
                                        </_.CharacterInformationRowAttribute>
                                        <_.CharacterInformationRowValue>
                                            <_.CharacterInformationRowValueText>1일</_.CharacterInformationRowValueText>
                                        </_.CharacterInformationRowValue>
                                    </_.CharacterInformationRow>

                                    <_.CharacterInformationRow>
                                        <_.CharacterInformationRowAttribute>
                                            <_.CharacterInformationRowAttributeText>애니메이션</_.CharacterInformationRowAttributeText>
                                        </_.CharacterInformationRowAttribute>
                                        <_.CharacterInformationRowValue>
                                            <_.CharacterInformationRowValueText>최애의 아이</_.CharacterInformationRowValueText>
                                        </_.CharacterInformationRowValue>
                                    </_.CharacterInformationRow>
                                </_.CharacterInformationInner>
                            </_.CharacterInformation>
                        </_.CharacterProfileBox>
                    </_.CharacterProfileInnerContainer>
                </_.CharacterProfileContainer>
            </_.Section1>

            <_.Section2>
                
            </_.Section2>

            <_.SubmitBtn>이 수정 요청을 문서에 병합하기</_.SubmitBtn>
        </_.Container>
    );
}

export default MemorialCommit;