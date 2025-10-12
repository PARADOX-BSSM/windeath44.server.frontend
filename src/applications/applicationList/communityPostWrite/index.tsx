import React from 'react';
import * as _ from './style';
import MemorialBtn from '@/applications/components/memorialBtn';

const CommunityPostWrite : React.FC = ()=>{

    return(
        <_.Container>
            <_.Title type='text' placeholder='제목을 입력해주세요' />
            <_.Content placeholder='자유롭게 글을 작성해 보세요.'></_.Content>
            <_.BtnArea>
                <MemorialBtn
                    name="이미지 첨부" selected={true} type = 'submit' active={true}
                    width='108px' height='32px' fontSize = '14px' />
                    <MemorialBtn name="임시저장/불러오기" selected={true} type = 'submit' active={true}
                    width='151px' height='32px' fontSize = '14px' />
                    <MemorialBtn name="취소" selected={true} type = 'submit' active={true}
                    width='60px' height='32px' fontSize = '14px' />
                    <MemorialBtn name="게시" selected={true} type = 'submit' active={true}
                    width='60px' height='32px' fontSize = '14px' />
            </_.BtnArea>
        </_.Container>
    );
}
export default CommunityPostWrite;