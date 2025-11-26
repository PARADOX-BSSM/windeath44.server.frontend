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
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  justify-content: space-between;
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InfoBox = styled.div`
  background: var(--very-light-primary-color);
  padding: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-family: 'Galmuri11', sans-serif;
  height: 51px;
  box-sizing: border-box;
  width: 268px;
  overflow: hidden;
  box-shadow:
    -1px -1px 0px 0px inset var(--chatbot-white),
    1px 1px 0px 0px inset var(--primary-black),
    -2px -2px 0px 0px inset var(--dark-primary-color),
    2px 2px 0px 0px inset var(--dark-primary-color);
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

export const MournersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MournersSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MournersTitle = styled.p`
  font-family: 'Galmuri11', sans-serif;
  font-size: 20px;
  color: var(--primary-black);
  margin: 0;
  text-align: left;
  font-weight: normal;
`;

export const MournersListContainer = styled.div`
  background: var(--very-light-primary-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 268px;
  padding: 2px;
  box-shadow:
    -1px -1px 0px 0px inset var(--chatbot-white),
    1px 1px 0px 0px inset var(--primary-black),
    -2px -2px 0px 0px inset var(--dark-primary-color),
    2px 2px 0px 0px inset var(--dark-primary-color);
`;

export const MournersList = styled.div`
  background: #cccccc;
  display: flex;
  flex-direction: column;
  gap: 1px;
  width: 100%;
`;

export const MournerItem = styled.div`
  background: white;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 8px;
  font-family: 'Galmuri11', sans-serif;
  box-sizing: border-box;
`;

export const MournerRankGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 72px;
`;

export const MournerRank = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: var(--stroke);
  font-family: 'Galmuri11', sans-serif;
`;

export const MournerAvatar = styled.img`
  width: 32px;
  height: 32px;
  object-fit: cover;
`;

export const MournerInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  color: var(--primary-black);
  white-space: nowrap;
`;

export const MournerCount = styled.span`
  font-size: 12px;
  color: var(--primary-black);
  white-space: nowrap;
`;

export const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: var(--light-primary-color);
`;

export const MemorialArea = styled.div`
  flex: 1;
  background: var(--chatbot-white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  top: -50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 18px solid #000;
  background: white;
`;

export const Ribbon = styled.img`
  position: absolute;
  top: -17px;
  left: 50%;
  transform: translateX(-50%);
  width: 194px;
  height: auto;
  z-index: 1;
`;

export const CharacterImage = styled.img`
  width: 194px;
  height: 236px;
  object-fit: cover;
  display: block;
`;

export const TableImage = styled.img`
  position: absolute;
  left: 50%;
  top: 40px;
  transform: translateX(-50%);
  width: 100%;
  height: auto;
  z-index: 2;
  pointer-events: none;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  shape-rendering: crispEdges;
`;

export const BowButtonSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const BowStatus = styled.div`
  font-family: 'Galmuri11', sans-serif;
  font-size: 18px;
  color: var(--primary-black);
  text-align: center;
`;
