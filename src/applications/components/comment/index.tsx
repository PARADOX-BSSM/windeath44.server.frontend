import * as _ from './style';
import ameImg from '@/assets/profile/ame.svg';
import chotenImg from '@/assets/profile/choten.svg';

interface PropsType {
  // nickname: string;
  userid: string;
  content: string;
  idx: number;
}

const Comment = ({ userid, content, idx }: PropsType) => {
  // console.log(idx);
  const imgUrl = idx % 2 === 0 ? ameImg : chotenImg;
  // console.log(imgUrl);
  return (
    <_.CommentDiv>
      <_.ProfileImg imgUrl={imgUrl} />
      <_.TextBox>
        <_.NickNameContainer>
          {/*<_.NickName>{nickname}</_.NickName>*/}
          <_.UserId>@{userid}</_.UserId>
        </_.NickNameContainer>
        <_.Content>{content}</_.Content>
      </_.TextBox>
    </_.CommentDiv>
  );
};

export default Comment;
