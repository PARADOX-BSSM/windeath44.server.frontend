import * as _ from './style';
import HommerBackground from '@/assets/community/homer_background.png';
import Hommer from '@/assets/community/hommer.svg';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { useAtomValue } from 'jotai';

const JudgementPreview = () => {
  const taskTransform = useAtomValue(taskTransformerAtom);

  return (
    <_.Judgement>
      <_.NavJudgement>
        <_.JudgementImgDiv
          background={HommerBackground}
          onClick={() => {
            if (taskTransform) taskTransform('', '재판');
          }}
        >
          <_.JudgementImg src={Hommer} />
        </_.JudgementImgDiv>
        <_.JudgementText>재판으로</_.JudgementText>
      </_.NavJudgement>

      <_.JudgementLankArea>
        <_.JudgementText>진행중인 재판</_.JudgementText>
        <_.JudgementLankList>
          <_.JudgementLank>
            <_.JudgementLankNum>#1</_.JudgementLankNum>
            <_.JudgementName>호시노 아이</_.JudgementName>
          </_.JudgementLank>
          <_.JudgementLank>
            <_.JudgementLankNum>#2</_.JudgementLankNum>
            <_.JudgementName>포트거스 D. 에이스</_.JudgementName>
          </_.JudgementLank>
          <_.JudgementLank>
            <_.JudgementLankNum>#3</_.JudgementLankNum>
            <_.JudgementName>사토 카즈마</_.JudgementName>
          </_.JudgementLank>
        </_.JudgementLankList>
      </_.JudgementLankArea>
    </_.Judgement>
  );
};
export default JudgementPreview;
