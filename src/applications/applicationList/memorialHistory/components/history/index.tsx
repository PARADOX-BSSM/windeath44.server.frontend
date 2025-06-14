import * as _ from './style';

interface PropsType{
    id:string,
    editedAt:string,
    description:string,
}

const History = ({ id, editedAt, description } : PropsType) => {
    return(
        <_.Container>
            <_.Profile />
            <_.TextContainer>
                <_.ProfileTextContainer>
                    <_.ProfileId>@{id}</_.ProfileId>
                    <_.EditedAt>{editedAt}</_.EditedAt>
                </_.ProfileTextContainer>
                <_.EditDescription>{description}</_.EditDescription>
            </_.TextContainer>
            <_.ViewBtn>수정 내용 보기</_.ViewBtn>
        </_.Container>
    );
}

export default History;