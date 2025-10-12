import React from "react";
import * as _ from './style';
import ProfileImg from '@/assets/profile/choten.svg';
import Heart from '@/assets/community/heart_line.svg';
import CommentIcon from '@/assets/community/comment.svg';

interface User {
    name: string;
    id: string;
    profileImage: string;
}
interface Post{
    content: string;
    comment: number;
    heart: number;
}
interface PostsProps {
    user: User;
    post: Post;
    type: String;
}
const Posts : React.FC<PostsProps> = ({ user, post, type="" })=>{
        const {name, id, profileImage=""} = user;
        const {content, comment=0, heart=0} = post;
    return(
        <_.Post>
            <_.Line></_.Line>
            <_.ProfileImg imgUrl={profileImage||ProfileImg} />
            <_.PostMain>
                <_.PostInfo>
                    <_.Name>{name}</_.Name>
                    <_.UserId>@{id}</_.UserId>
                </_.PostInfo>
                <_.PostContent>{content}</_.PostContent>
                <_.PostInfo>
                    <_.Icons><_.Icon src={Heart} alt="PostHeart" />{comment}</_.Icons>
                    <_.Icons><_.Icon src={CommentIcon} alt="PostComment" />{heart}</_.Icons>
                </_.PostInfo>
            </_.PostMain>
        </_.Post>
    )
}

export default Posts;