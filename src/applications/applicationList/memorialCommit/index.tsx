import * as _ from './style';
import MemorialTextarea from '@/applications/components/memorialTextarea';
import { useEffect, useState } from 'react';
import { useGetUserMutation } from '@/api/user/getUser.ts';
import { usePostCommit } from '@/api/memorial/userCommit.ts';
import { inputProps } from '@/modules/typeModule.tsx';
import { useAtom } from 'jotai';
import { memorialContentAtom } from '@/atoms/memorialManager.ts';

const MemorialCommit = ({
  stackProps,
  name,
  deathReason,
  date,
  lifeCycle,
  anime,
  animeId,
  age,
  profileImage,
}: inputProps) => {
  const [userName, setUserName] = useState('winshine0326');
  const { mutate: getUser, data, isPending, error } = useGetUserMutation();
  const mutateUsePostCommit = usePostCommit();
  const [, setMemorialContent] = useAtom(memorialContentAtom);

  useEffect(() => {
    getUser(undefined, {
      onSuccess: (data) => {
        console.log('성공:', data);
        setUserName(data.data.userId);
      },
      onError: (err) => {
        console.error('에러:', err);
      },
    });

    return () => {
      setMemorialContent({
        characterId: '',
        content: '',
      });
    };
  }, [getUser, setMemorialContent]);

  return (
    <_.Container>
      <_.Section1>
        <_.Header>
          <_.HeaderTextContainer>
            <_.CharacterName>{name}</_.CharacterName>
            <_.Status>문서 수정 중</_.Status>
          </_.HeaderTextContainer>
          <_.AuthorshipFrom>@{userName}의 수정 요청</_.AuthorshipFrom>
        </_.Header>
        <_.CharacterProfileContainer>
          <_.CharacterProfileInnerContainer>
            <_.CharacterProfileBox>
              <_.CharacterProfile>
                <_.CharacterProfileImg />
                <_.CharacterProfileName>{name}</_.CharacterProfileName>
              </_.CharacterProfile>

              <_.CharacterInformation>
                <_.CharacterInformationInner>
                  <_.CharacterInformationRow>
                    <_.CharacterInformationRowAttribute>
                      <_.CharacterInformationRowAttributeText>
                        나이
                      </_.CharacterInformationRowAttributeText>
                    </_.CharacterInformationRowAttribute>
                    <_.CharacterInformationRowValue>
                      <_.CharacterInformationRowValueText>
                        향년 {age}세
                      </_.CharacterInformationRowValueText>
                    </_.CharacterInformationRowValue>
                  </_.CharacterInformationRow>

                  <_.CharacterInformationRow>
                    <_.CharacterInformationRowAttribute>
                      <_.CharacterInformationRowAttributeText>
                        사망 날짜
                      </_.CharacterInformationRowAttributeText>
                    </_.CharacterInformationRowAttribute>
                    <_.CharacterInformationRowValue>
                      <_.CharacterInformationRowValueText>
                        {date}
                      </_.CharacterInformationRowValueText>
                    </_.CharacterInformationRowValue>
                  </_.CharacterInformationRow>

                  <_.CharacterInformationRow>
                    <_.CharacterInformationRowAttribute>
                      <_.CharacterInformationRowAttributeText>
                        생존 기간
                      </_.CharacterInformationRowAttributeText>
                    </_.CharacterInformationRowAttribute>
                    <_.CharacterInformationRowValue>
                      <_.CharacterInformationRowValueText>
                        {lifeCycle}화
                      </_.CharacterInformationRowValueText>
                    </_.CharacterInformationRowValue>
                  </_.CharacterInformationRow>

                  <_.CharacterInformationRow>
                    <_.CharacterInformationRowAttribute>
                      <_.CharacterInformationRowAttributeText>
                        사인
                      </_.CharacterInformationRowAttributeText>
                    </_.CharacterInformationRowAttribute>
                    <_.CharacterInformationRowValue>
                      <_.CharacterInformationRowValueText>
                        {deathReason}
                      </_.CharacterInformationRowValueText>
                    </_.CharacterInformationRowValue>
                  </_.CharacterInformationRow>

                  <_.CharacterInformationRow>
                    <_.CharacterInformationRowAttribute>
                      <_.CharacterInformationRowAttributeText>
                        애니메이션
                      </_.CharacterInformationRowAttributeText>
                    </_.CharacterInformationRowAttribute>
                    <_.CharacterInformationRowValue>
                      <_.CharacterInformationRowValueText>
                        {anime}
                      </_.CharacterInformationRowValueText>
                    </_.CharacterInformationRowValue>
                  </_.CharacterInformationRow>
                </_.CharacterInformationInner>
              </_.CharacterInformation>
            </_.CharacterProfileBox>
          </_.CharacterProfileInnerContainer>
        </_.CharacterProfileContainer>
      </_.Section1>

      <MemorialTextarea
        btnText="이 내용으로 문서에 병합하기"
        from={userName}
        isPerson={true}
        isReadonly={false}
      />
    </_.Container>
  );
};

export default MemorialCommit;
