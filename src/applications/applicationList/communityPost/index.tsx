import  React from 'react';
import * as _ from './style';
import Posts from '@/applications/components/posts';
import Comment from '@/applications/components/communityComment';
import CommentInput from '@/applications/components/commentInput';
import chevron from '@/assets/community/chevron-left.svg';

const CommunityPost: React.FC = ()=>{
    return(
        <_.Container>
            <_.Main>
                <_.Header>
                    <_.Icon src={chevron} />
                    방태양님의 게시글
                </_.Header>
                <_.PostArea>
                    <Posts user={{name:"방태양", id:"noah_byte", profileImage:""}} 
                    post={{title:"아니 얘가 벌써 죽는다고?", content:"아니 이건 진짜 아니지. 살려내라.", postImage:"",
                        datetime:"2025년 09월 14일 AM 8:47", heart:12, comment:20
                    }}  />
                    <CommentInput name="방태양" id="noah_byte" profileImage='' />
                    <Comment 
                    user={{name:"방태양", id:"noah_byte", profileImage:""}} 
                    post={{content:"아니 이건 진짜 아니지. 살려내라.",
                        heart:12, comment:20}}
                    type=""
                    />

                </_.PostArea>
            </_.Main>
            <_.Judgement>
                <_.NavJudgement>
                    <_.JudgementImg />
                    <_.JudgementText>재판으로</_.JudgementText>
                </_.NavJudgement>

                <_.JudgementLankArea>
                    <_.JudgementText>진행중인 재판</_.JudgementText>
                    <_.JudgementLankList>
                        <_.JudgementLank>
                            <_.JudgementLankNum>#1</_.JudgementLankNum>
                            <_.JudgementName>호시노 아이</_.JudgementName>
                        </_.JudgementLank>
                        <_.JudgementLank>
                            <_.JudgementLankNum>#2</_.JudgementLankNum>
                            <_.JudgementName>포트거스 D. 에이스</_.JudgementName>
                        </_.JudgementLank>
                        <_.JudgementLank>
                            <_.JudgementLankNum>#3</_.JudgementLankNum>
                            <_.JudgementName>사토 카즈마</_.JudgementName>
                        </_.JudgementLank>
                    </_.JudgementLankList>
                </_.JudgementLankArea>
            </_.Judgement>
        </_.Container>
        
    )
}

export default CommunityPost;