import { useEffect, useState } from 'react';
import MemorialBtn from '@/applications/components/memorialBtn';
import * as _ from './style.ts';


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

    useEffect(() => {
        if (selectedIdx === 0) {
            console.log(selectedIdx);
            setDescription(
                <>
                    최애의 사인은 작품 내에서 사망한 애니메이션 캐릭터를 추모하는 공간입니다.
                    <br/>
                    오른쪽의 버튼을 눌러 계속 진행할 수 있습니다.
                </>
            );
        }
        if (selectedIdx === 1) {
            setDescription(
                <>
                    최애의 사인은 작품 내에서 사망한 애니메이션 캐릭터를 추모하는 공간입니다.
                    <br/>
                    오른쪽의 버튼을 눌러 계속 진행할 수 있습니다.
                </>
            );
        }
        if (selectedIdx === 2) {
            setDescription(
                <>
                    최애의 사인은 작품 내에서 사망한 애니메이션 캐릭터를 추모하는 공간입니다.
                    <br/>
                    오른쪽의 버튼을 눌러 계속 진행할 수 있습니다.
                </>
            );
        }
    }, [selectedIdx]);

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
                    <MemorialBtn name="입장하기" type="submit" active={selectedIdx !== null}/>
                </_.Footer>
            </_.InnerContainer>
        </_.Container>
    )
}

export default MemorialMenu;