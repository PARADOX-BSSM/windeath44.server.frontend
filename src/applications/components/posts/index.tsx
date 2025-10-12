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
    title: string;
    content: string;
    postImage: string;
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
        const {title, content, comment=0, heart=0, postImage="", datetime} = post;
    return(
        <_.Post>
            <_.Main>
                <_.ProfileImg imgUrl={profileImage||ProfileImg} />
                <_.PostMain>
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
                        <_.Icons><_.Icon src={Heart} alt="PostHeart" />{comment}</_.Icons>
                        <_.Icons><_.Icon src={CommentIcon} alt="PostComment" />{heart}</_.Icons>
                    </_.PostInfo>
                </_.PostMain>
            </_.Main>
            
            <_.PostImg imgUrl={postImage} />
        </_.Post>
    )
}

export default Posts;