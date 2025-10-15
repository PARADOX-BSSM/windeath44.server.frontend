import React from 'react';
import * as _ from './style';
import { useState } from 'react';
import CommunityBtn from '@/applications/components/communityBtn';
import ChevronIcon from '@/assets/community/chevron-left.svg';

const CommunityPostWrite : React.FC = ()=>{
    const [loadPage, setLoadPage] = useState(false); 
    return(
        <_.Container>
            {!loadPage?
            <>
                <_.Title type='text' placeholder='제목을 입력해주세요' />
                <_.Content placeholder='자유롭게 글을 작성해 보세요.'></_.Content>
            </> : 
            <>
                <_.Header>
                    <_.BeforeBtn onClick={()=>setLoadPage(false)}><_.Icon src={ChevronIcon} /></_.BeforeBtn>
                    방태양님의 게시글
                </_.Header>
                <_.PostArea>
                    {
                        <_.Post>
                            <_.PostText>
                                <_.PostTitle>아니근데진짜</_.PostTitle>
                                <_.PostContent>살려주라...</_.PostContent>
                            </_.PostText>
                            <_.PostBtnArea>
                                <_.PostBtn>선택</_.PostBtn>
                                <_.PostBtn>삭제</_.PostBtn>
                            </_.PostBtnArea>
                        </_.Post>
                    }
                </_.PostArea>
            </>
            }
            
            <_.BtnArea>
                <CommunityBtn
                    name="이미지 첨부" type = 'submit' />
                <CommunityBtn name="임시저장/불러오기" selected={loadPage} onClick={()=>{setLoadPage(!loadPage)}} type = 'menu' />
                <CommunityBtn name="게시" type = 'submit' />
            </_.BtnArea>
        </_.Container>
    );
}
export default CommunityPostWrite;