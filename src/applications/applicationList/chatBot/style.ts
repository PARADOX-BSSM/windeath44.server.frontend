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

export const ProfileSection = styled.div`
  background: var(--very-light-primary-color);
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex: 1;
  overflow: hidden;
  box-shadow:
    -1px -1px 0px 0px inset var(--chatbot-white),
    1px 1px 0px 0px inset var(--primary-black),
    -2px -2px 0px 0px inset var(--dark-primary-color),
    2px 2px 0px 0px inset var(--dark-primary-color);
`;

export const ProfileTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const CharacterImageContainer = styled.div`
  width: 172px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CharacterImage = styled.img`
  width: 174px;
  height: 226px;
  object-fit: cover;
  box-shadow:
    -1px -1px 0px 0px inset var(--chatbot-white),
    1px 1px 0px 0px inset var(--primary-black),
    -2px -2px 0px 0px inset var(--dark-primary-color),
    2px 2px 0px 0px inset var(--dark-primary-color);
`;

export const CharacterName = styled.p`
  font-family: 'Galmuri11', sans-serif;
  font-size: 22px;
  color: var(--primary-black);
  margin: 0;
  text-align: center;
`;

export const ContributorsSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 11px;
  margin-top: auto;
`;

export const ContributorsTitle = styled.p`
  font-family: 'Galmuri11', sans-serif;
  font-size: 18px;
  color: var(--primary-black);
  margin: 0;
  text-align: center;
`;

export const ContributorsList = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4px;
`;

export const ContributorAvatar = styled.img`
  width: 28.125px;
  height: 28.125px;
  border: 1px solid var(--primary-black);
  object-fit: cover;
`;

export const ContributorsCount = styled.p`
  font-family: 'Galmuri11', sans-serif;
  font-size: 14px;
  color: var(--chatbot-border);
  margin: 0;
  text-align: center;
`;

export const MemorialButton = styled.button`
  width: 100%;
  height: 48px;
  background: var(--chatbot-panel);
  border: none;
  font-family: 'Galmuri11', sans-serif;
  font-size: 22px;
  color: var(--primary-black);
  cursor: pointer;
  box-shadow:
    -2px -2px 0px 0px inset var(--primary-black),
    2px 2px 0px 0px inset var(--chatbot-white),
    -4px -4px 0px 0px inset var(--dark-primary-color),
    4px 4px 0px 0px inset var(--secondary-color);
`;

export const RightPanel = styled.div`
  flex: 1;
  display: flex;
  gap: 20px;
  flex-direction: column;
  background-color: var(--light-primary-color);
`;

export const ChatArea = styled.div`
  flex: 1;
  background: var(--chatbot-white);
  display: flex;
  flex-direction: column;
  gap: 245px;
  overflow: hidden;
  position: relative;
  padding: 0px 1px;
  box-shadow:
    -1px -1px 0px 0px inset var(--chatbot-white),
    1px 1px 0px 0px inset var(--primary-black),
    -2px -2px 0px 0px inset var(--dark-primary-color),
    2px 2px 0px 0px inset var(--dark-primary-color);
`;

export const ChatMessagesContainer = styled.div`
  background: var(--chatbot-background-overlay);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 1px;
  padding: 1px 0;
`;

export const InputSection = styled.div`
  display: flex;
  gap: 10px;
  height: 48px;
  padding: 0;
`;

export const InputForm = styled.form`
  flex: 1;
  display: flex;
`;

export const MessageInput = styled.input`
  flex: 1;
  background: var(--chatbot-white);
  border: none;
  padding: 16px;
  font-family: 'Galmuri11', sans-serif;
  font-size: 18px;
  color: var(--primary-black);
  box-shadow:
    -1px -1px 0px 0px inset var(--chatbot-white),
    1px 1px 0px 0px inset var(--primary-black),
    -2px -2px 0px 0px inset var(--dark-primary-color),
    2px 2px 0px 0px inset var(--dark-primary-color);

  &::placeholder {
    color: var(--chatbot-placeholder);
    font-family: 'Galmuri11', sans-serif;
    font-size: 18px;
    line-height: 26px;
  }

  &:focus {
    outline: none;
  }
`;

export const SendButton = styled.button`
  width: 140px;
  height: 44px;
  background: #ffd3fb;
  border: none;
  font-family: 'Galmuri11', sans-serif;
  font-size: 20px;
  color: var(--primary-black);
  cursor: pointer;
  box-shadow:
    -2px -2px 0px 0px inset #2e2e2e,
    2px 2px 0px 0px inset #ffffff,
    -4px -4px 0px 0px inset #dcafdd,
    4px 4px 0px 0px inset #ffbbf5;
`;
