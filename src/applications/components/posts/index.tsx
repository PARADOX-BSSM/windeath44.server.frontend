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
    postid: number;
    title: string;
    content: string;
    comment: number;
    heart: number;
    datetime: string;
}
interface PostsProps {
    user: User;
    post: Post;
}
const Posts : React.FC<PostsProps> = ({ user, post })=>{
        const {name, id, profileImage=""} = user;
        const {postid, title, content, comment=0, heart=0, datetime} = post;
    return(
        <_.Post>
            <_.ProfileImg imgUrl={profileImage||ProfileImg} />
            <_.Main>
                <_.PostInfo>
                    <_.Name>{name}</_.Name>
                    <_.UserId>@{id}</_.UserId>
                </_.PostInfo>
                <_.Content>
                    <_.PostTitle>{title}</_.PostTitle>
                    <_.PostContent>{content}</_.PostContent>
                </_.Content>
                <_.Datetime>{datetime}</_.Datetime>
                <_.PostInfo>
                    
                    <_.Icon><img src={Heart} alt="" />{comment}</_.Icon>
                    <_.Icon><img src={CommentIcon} alt="" />{heart}</_.Icon>
                </_.PostInfo>
            </_.Main>
        </_.Post>
    )
}

export default Posts;