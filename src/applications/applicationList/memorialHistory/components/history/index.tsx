import * as _ from './style';

const History = () => {
    return(
        <_.Container>
            <_.Profile />
            <_.TextContainer>
                <_.ProfileTextContainer>
                    <_.ProfileId>@raincandy_U</_.ProfileId>
                    <_.EditedAt>2025-07-04 12:34:56</_.EditedAt>
                </_.ProfileTextContainer>
                <_.EditDescription>수정 내용 설명</_.EditDescription>
            </_.TextContainer>
            <_.ViewBtn>수정 내용 보기</_.ViewBtn>
        </_.Container>
    );
}

export default History;