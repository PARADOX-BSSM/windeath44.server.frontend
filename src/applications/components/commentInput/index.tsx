import React from "react";
import * as _ from './style';
import ProfileImg from '@/assets/profile/choten.svg';
import Emoticon from '@/assets/community/emoticon.svg';
import CommunityBtn from "../communityBtn";

interface PostsProps {
    name: string;
    id: string;
    profileImage: string;
    onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void);
}
const Posts : React.FC<PostsProps> = ({ name, id, profileImage, onClick })=>{
    return(
        <_.Post>
            <_.Line></_.Line>
            <_.ProfileImg imgUrl={profileImage||ProfileImg} />
            <_.PostMain>
                <_.PostInfo>
                    <_.Name>{name}</_.Name>
                    <_.UserId>@{id}</_.UserId>
                </_.PostInfo>
                <_.CommentMain>
                    <_.InputArea>
                        <_.Input type="text" placeholder="자유롭게 의견을 작성해보세요!" />
                        <_.Icon src={Emoticon} />
                    </_.InputArea>
                    
                    <CommunityBtn name="게시" type='submit' onClick={onClick} />
                </_.CommentMain>
            </_.PostMain>
        </_.Post>
    )
}

export default Posts;