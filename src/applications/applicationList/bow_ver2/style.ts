import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  background-color: var(--light-primary-color);
`;

export const MainContent = styled.div`
  display: flex;
  flex: 1;
  gap: 20px;
  overflow: hidden;
`;

export const LeftPanel = styled.div`
  width: 268px;
  background: var(--chatbot-panel);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InfoSection = styled.div`
  background: var(--very-light-primary-color);
  padding: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const InfoLabel = styled.span`
  font-size: 20px;
  line-height: 27px;
  color: var(--primary-black);
  font-weight: normal;
`;

export const InfoValue = styled.span`
  font-size: 20px;
  line-height: 27px;
  color: var(--primary-black);
  font-weight: normal;
`;

export const MournersSection = styled.div`
  background: var(--very-light-primary-color);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  overflow: hidden;
  box-shadow:
    -1px -1px 0px 0px inset var(--chatbot-white),
    1px 1px 0px 0px inset var(--primary-black),
    -2px -2px 0px 0px inset var(--dark-primary-color),
    2px 2px 0px 0px inset var(--dark-primary-color);
`;

export const MournersTitle = styled.p`
  font-family: 'Galmuri11', sans-serif;
  font-size: 18px;
  color: var(--primary-black);
  margin: 0;
  text-align: left;
  font-weight: bold;
`;

export const MournersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  flex: 1;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: var(--light-primary-color);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--stroke);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--primary-black);
  }
`;

export const MournerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Galmuri11', sans-serif;
`;

export const MournerRank = styled.span<{ isChief?: boolean }>`
  font-size: 18px;
  font-weight: bold;
  color: ${({ isChief }) => (isChief ? 'var(--primary-black)' : 'var(--stroke)')};
  min-width: 32px;
`;

export const MournerAvatar = styled.img`
  width: 32px;
  height: 32px;
  border: 1px solid var(--primary-black);
  object-fit: cover;
`;

export const MournerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
`;

export const MournerNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const MournerName = styled.span`
  font-size: 14px;
  color: var(--primary-black);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MournerBadge = styled.span`
  font-size: 12px;
  color: var(--stroke);
  white-space: nowrap;
`;

export const MournerCount = styled.span`
  font-size: 14px;
  color: var(--stroke);
  margin-left: auto;
  white-space: nowrap;
`;

export const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--light-primary-color);
`;

export const MemorialArea = styled.div`
  flex: 1;
  background: var(--chatbot-white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  gap: 40px;
  overflow: hidden;
  position: relative;
  box-shadow:
    -1px -1px 0px 0px inset var(--chatbot-white),
    1px 1px 0px 0px inset var(--primary-black),
    -2px -2px 0px 0px inset var(--dark-primary-color),
    2px 2px 0px 0px inset var(--dark-primary-color);
`;

export const PictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: relative;
  border: 12px solid #000;
`;

export const Ribbon = styled.img`
  position: absolute;
  top: -11px;
  width: 300px;
  z-index: 1;
`;

export const CharacterImage = styled.img`
  width: 300px;
  height: 390px;
  object-fit: cover;
`;

export const BowButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
`;

export const BowStatus = styled.div`
  font-family: 'Galmuri11', sans-serif;
  font-size: 18px;
  color: var(--primary-black);
  text-align: center;
`;
