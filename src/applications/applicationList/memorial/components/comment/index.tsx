import * as _ from './style';

interface PropsType{
    nickname:string,
    userid:string,
    content:string,
}


const Comment = ({nickname,userid,content} : PropsType) => {
    return(
        <_.CommentDiv>
            <_.ProfileImg />
            <_.TextBox>
                <_.NickNameContainer>
                    <_.NickName>{nickname}</_.NickName>
                    <_.UserId>@{userid}</_.UserId>
                </_.NickNameContainer>
                <_.Content>{content}</_.Content>
            </_.TextBox>
        </_.CommentDiv>
    );
}

export default Comment;