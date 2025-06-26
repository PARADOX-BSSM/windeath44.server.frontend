import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import MemorialBtn from '@/applications/components/memorialBtn';
import * as _ from './style.ts';
import { taskTransformerAtom } from '@/atoms/taskTransformer.ts';


const btnList = ["추모관 검색", "즐겨찾기", "추모관 신청"];

const MemorialMenu = () => {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [description, setDescription] = useState<JSX.Element | null>(
        <>
            최애의 사인은 작품 내에서 사망한 애니메이션 캐릭터를 추모하는 공간입니다.
            <br/>
            오른쪽의 버튼을 눌러 계속 진행할 수 있습니다.
        </>
    );

    const taskTransform = useAtomValue(taskTransformerAtom);

    useEffect(() => {
        if (selectedIdx === 0) {
            setDescription(
                <>
                    "추모관 검색"에서 다양한 캐릭터의 추모관을 찾아볼 수 있습니다. 
                    <br/><br/>
                    <span style={{fontSize: 18}}>* 추모관에서 다른 사람들과 함께 캐릭터에 대한 기억을 나눠볼 수 있습니다.</span>
                </>
            );
        }
        if (selectedIdx === 1) {
            setDescription(
                <>
                    "즐겨찾기"에서 이전에 즐겨찾기에 등록해놓은 추모관을 볼 수 있습니다.
                    <br/><br/>
                    <span style={{fontSize: 18}}>* 추모관을 즐겨찾기에 등록하여 편리하게 이동할 수 있습니다.</span>
                </>
            );
        }
        if (selectedIdx === 2) {
            setDescription(
                <>
                    "추모관 신청"에서 최애의 사인에 존재하지 않는 추모관을 신청할 수 있습니다.
                    <br/><br/>
                    <span style={{fontSize: 18}}>* 추모관 신청은 주로 1~2일 내에 받아들여집니다.</span>
                </>
            );
        }
    }, [selectedIdx]);

    const moveTo = (idx: number | null) => {
        if (idx === 0) {
            taskTransform?.('추모관', 'Search');
        }
        if (idx === 1) {
            taskTransform?.('추모관', 'memorial');
        }
        if (idx === 2) {
            taskTransform?.('추모관', 'MemorialCommit');
        }
    };

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
                            {description}
                        </_.Description>
                    </_.DescriptionBox>
                    <_.BtnWrapper>
                        <_.BtnInnerWrapper>
                            {btnList.map((name, idx) => (
                                <MemorialBtn
                                    key={name}
                                    name={name}
                                    selected={selectedIdx === idx}
                                    onClick={() => setSelectedIdx(idx)}
                                    type="menu"
                                />
                            ))}
                        </_.BtnInnerWrapper>
                        <_.BtnVoid />
                    </_.BtnWrapper>
                </_.MainContainer>
                <_.Footer>
                    <MemorialBtn name="입장하기" type="submit" active={selectedIdx !== null} onClick={() => {
                        moveTo(selectedIdx);
                    }}/>
                </_.Footer>
            </_.InnerContainer>
        </_.Container>
    )
}

export default MemorialMenu;