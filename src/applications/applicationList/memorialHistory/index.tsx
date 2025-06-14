import * as _ from './style';
import History from './components/history';

const MemorailHistory = () => {
    return (
        <_.Container>
            <_.InnerContainer>
                <_.ContentContainer>
                    <_.Header>
                        <_.InnerHeader>
                            <_.LeftHeader>
                                <_.Title>호시노 아이</_.Title>
                                <_.SubTitle>최근 수정: 2025-07-04 12:34:56</_.SubTitle>
                            </_.LeftHeader>
                            <_.GoToBackBtn>돌아가기</_.GoToBackBtn>
                        </_.InnerHeader>
                    </_.Header>
                    <_.HistoryContainer>
                        <_.HistoryContainerTitle>수정 기록</_.HistoryContainerTitle>
                        <History />
                        <History />
                        <History />
                    </_.HistoryContainer>
                </_.ContentContainer>
            </_.InnerContainer>
        </_.Container>
    );
}

export default MemorailHistory;