import * as _ from './style';
import MemorialTextarea from '@/applications/components/memorialTextarea';
import { useAtom, useAtomValue } from 'jotai';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { useState } from 'react';
import MemorialBtn from '@/applications/components/memorialBtn';
import { inputPortage } from '@/atoms/inputManager';

interface dataStructureProps {
    stack: any[];
    push: any
    pop: any;
    top: any;
  }

const MemorialApply = ({}: dataStructureProps) => {
    const taskTransform = useAtomValue(taskTransformerAtom);
    const [name, setName] = useState("");
    const userName = "winshine0326"
    const [inputValue,setInputValue] = useAtom(inputPortage);

    return (
        <_.Container>
            <_.Section1>
                <_.Header>
                    <_.HeaderTextContainer>
                        <_.CharacterNameInput placeholder='이름을 입력해주세요...' onChange={(e) => setName(e.target.value)}></_.CharacterNameInput>
                        <_.Status>문서 수정 중</_.Status>
                    </_.HeaderTextContainer>
                    <_.AuthorshipFrom>@{userName}의  요청</_.AuthorshipFrom>
                </_.Header>
                <_.CharacterProfileContainer>
                    <_.CharacterProfileInnerContainer>
                        <_.CharacterProfileBox>
                            <_.CharacterProfile>
                                <_.CharacterProfileImg />
                                <_.CharacterProfileName>{name}</_.CharacterProfileName>
                            </_.CharacterProfile>

                            <_.CharacterInformation>
                                <_.CharacterInformationInner>
                                    <_.CharacterInformationRow>
                                        <_.CharacterInformationRowAttribute>
                                            <_.CharacterInformationRowAttributeText>나이</_.CharacterInformationRowAttributeText>
                                        </_.CharacterInformationRowAttribute>
                                        <_.CharacterInformationRowValue>
                                            <_.CharacterInformationRowValueText>
                                                <_.CharacterInforInput type='text' placeholder='예) 향년 20세' onChange={(e)=>{setInputValue(prev => ({...prev,age: e.target.value,}))}}></_.CharacterInforInput>
                                            </_.CharacterInformationRowValueText>
                                        </_.CharacterInformationRowValue>
                                    </_.CharacterInformationRow>

                                    <_.CharacterInformationRow>
                                        <_.CharacterInformationRowAttribute>
                                            <_.CharacterInformationRowAttributeText>사망 날짜</_.CharacterInformationRowAttributeText>
                                        </_.CharacterInformationRowAttribute>
                                        <_.CharacterInformationRowValue>
                                            <_.CharacterInformationRowValueText><_.CharacterInforInput type='text' placeholder='예) 2023.04.12' onChange={(e)=>{setInputValue(prev => ({...prev,date: e.target.value,}))}}></_.CharacterInforInput></_.CharacterInformationRowValueText>
                                        </_.CharacterInformationRowValue>
                                    </_.CharacterInformationRow>

                                    <_.CharacterInformationRow>
                                        <_.CharacterInformationRowAttribute>
                                            <_.CharacterInformationRowAttributeText>생존 기간</_.CharacterInformationRowAttributeText>
                                        </_.CharacterInformationRowAttribute>
                                        <_.CharacterInformationRowValue>
                                            <_.CharacterInformationRowValueText><_.CharacterInforInput type='text' placeholder='예) 1일' onChange={(e)=>{setInputValue(prev => ({...prev,lifeCycle: e.target.value,}))}}></_.CharacterInforInput></_.CharacterInformationRowValueText>
                                        </_.CharacterInformationRowValue>
                                    </_.CharacterInformationRow>

                                    <_.CharacterInformationRow>
                                        <_.CharacterInformationRowAttribute>
                                            <_.CharacterInformationRowAttributeText>애니메이션</_.CharacterInformationRowAttributeText>
                                        </_.CharacterInformationRowAttribute>
                                        <_.CharacterInformationRowValue>
                                            <_.CharacterInformationRowValueText>
                                                <MemorialBtn name='애니메이션 찾기' onClick={
                                                    () => {
                                                        console.log(taskTransform);
                                                        if (taskTransform) {
                                                            taskTransform('', '애니메이션 선택');
                                                        }
                                                    }
                                                } type='submit' active={true} widthPercent={15} heightPercent={5} fontSize='1rem' />
                                            </_.CharacterInformationRowValueText>
                                        </_.CharacterInformationRowValue>
                                    </_.CharacterInformationRow>
                                </_.CharacterInformationInner>
                            </_.CharacterInformation>
                        </_.CharacterProfileBox>
                    </_.CharacterProfileInnerContainer>
                </_.CharacterProfileContainer>
            </_.Section1>

            <MemorialTextarea btnText='추모관 신청하기' from={userName} content='<목차>마지막 순간</목차>
<사진 {80px}>https://buma.wiki/api/image/display/최애의사인/example.png</사진>
<동영상>https://www.youtube.com/watch?v=oMk46C5Cjws</동영상>'
            isPerson={true}
          />
        </_.Container>
    );
}

export default MemorialApply;