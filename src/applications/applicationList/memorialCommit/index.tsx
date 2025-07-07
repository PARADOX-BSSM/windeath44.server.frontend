import MergeBtn from '@/applications/components/mergeBtn';
import * as _ from './style';
import MemorialTextarea from '@/applications/components/memorialTextarea';
import { useAtomValue } from 'jotai';
import { taskSearchAtom } from '@/atoms/taskTransformer';

interface dataStructureProps {
    stack: any[];
    push: any
    pop: any;
    top: any;
  }

const MemorialCommit = ({ stack, push, pop, top }: dataStructureProps) => {
    const taskSearch = useAtomValue(taskSearchAtom);

    return (
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

            <MemorialTextarea btnText='이 내용으로 문서에 병합하기' from='winshine1034' content='<목차>마지막 순간</목차>
<사진 {80px}>https://buma.wiki/api/image/display/최애의사인/example.png</사진>
<동영상>https://www.youtube.com/watch?v=oMk46C5Cjws</동영상>'
            isPerson={true}
          />
        </_.Container>
    );
}

export default MemorialCommit;