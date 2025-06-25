import * as _ from './style';
import History from './components/history';
import { historyData } from './data';
import { useAtomValue } from 'jotai';
import { taskTransformerAtom } from '@/atoms/taskTransformer';

const MemorailHistory = () => {
    const taskTransform = useAtomValue(taskTransformerAtom);

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
                            <_.GoToBackBtn onClick={() => { 
                                taskTransform?.('memorailHistory', 'memorial');
                            }}>돌아가기</_.GoToBackBtn>
                        </_.InnerHeader>
                    </_.Header>
                    <_.HistoryContainer>
                        <_.HistoryContainerTitle>수정 기록</_.HistoryContainerTitle>
                        <_.HistoryBox>
                            <_.HistoryInnerBox>
                                {
                                    historyData.map((history) => {
                                        return <History
                                            id={history.id}
                                            editedAt={history.editedAt}
                                            description={history.description}
                                            profileUrl={history.profileUrl}
                                        />
                                    })
                                }
                            </_.HistoryInnerBox>
                        </_.HistoryBox>
                    </_.HistoryContainer>
                </_.ContentContainer>
            </_.InnerContainer>
        </_.Container>
    );
}

export default MemorailHistory;