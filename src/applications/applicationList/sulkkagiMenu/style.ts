import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 24px;
  background: linear-gradient(
    135deg,
    var(--very-light-primary-color, #ffeefd) 0%,
    var(--light-primary-color, #ffd1fb) 100%
  );
  font-family: Galmuri11;
  position: relative;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  font-size: 48px;
  font-weight: 400;
  color: var(--primary-black, #2e2e2e);
  margin-bottom: 8px;
  font-family: Galmuri11;
  text-shadow:
    1px 1px 0px var(--stroke, #e774dd),
    2px 2px 0px var(--dark-primary-color, #d645c7);
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
`;

export const Subtitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
  color: var(--stroke, #e774dd);
  margin-bottom: 32px;
  font-family: Galmuri11;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 240px;
`;

interface MenuButtonProps {
  isExit?: boolean;
}

export const MenuButton = styled.button<MenuButtonProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 24px;
  box-sizing: border-box;
  background: ${(props) =>
    props.isExit ? 'var(--primary-color)' : 'var(--light-primary-color, #ffd1fb)'};
  color: ${(props) => (props.isExit ? 'white' : 'var(--primary-black, #2e2e2e)')};
  border: 2px solid var(--stroke, #e774dd);
  box-shadow:
    -1px -1px 0px 0px var(--primary-black) inset,
    1px 1px 0px 0px #fff inset,
    -2px -2px 0px 0px var(--dark-primary-color) inset,
    2px 2px 0px 0px var(--secondary-color) inset;
  cursor: none;
  font-family: Galmuri11;
  font-size: 16px;
  font-weight: 400;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.isExit ? '#474747ff' : 'var(--secondary-color, #ffbbf5)')};
  }

  &:active {
    transform: translate(0px, 0px);
    box-shadow:
      -1px -1px 0px 0px var(--primary-black) inset,
      1px 1px 0px 0px #fff inset;
  }
`;

export const ButtonIcon = styled.span`
  font-size: 18px;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
`;

export const ButtonText = styled.span`
  flex: 1;
  text-align: left;
`;

export const DescriptionModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(46, 46, 46, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const DescriptionContent = styled.div`
  background: var(--very-light-primary-color, #ffeefd);
  border: 2px solid var(--stroke, #e774dd);
  box-shadow:
    -2px -2px 0px 0px var(--primary-black) inset,
    2px 2px 0px 0px #fff inset,
    -3px -3px 0px 0px var(--dark-primary-color) inset,
    3px 3px 0px 0px var(--secondary-color) inset;
  padding: 24px;
  max-width: 480px;
  max-height: 80vh;
  overflow-y: auto;
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

export const DescriptionTitle = styled.h3`
  font-size: 22px;
  font-weight: 400;
  color: var(--primary-black, #2e2e2e);
  margin-bottom: 20px;
  font-family: Galmuri11;
  text-align: center;
  text-shadow: 1px 1px 0px var(--stroke, #e774dd);
`;

export const DescriptionText = styled.div`
  font-family: Galmuri11;
  font-size: 14px;
  line-height: 1.5;
  color: var(--primary-black, #2e2e2e);
`;

export const DescriptionSection = styled.div`
  margin-bottom: 18px;

  strong {
    display: block;
    margin-bottom: 6px;
    font-size: 16px;
    color: var(--stroke, #e774dd);
  }

  p {
    margin: 3px 0;
    padding-left: 12px;
  }
`;

export const CloseButton = styled.button`
  display: block;
  margin: 20px auto 0;
  padding: 10px 24px;
  background: var(--stroke, #e774dd);
  color: white;
  box-shadow:
    -1px -1px 0px 0px var(--primary-black) inset,
    1px 1px 0px 0px #fff inset;
  cursor: none;
  font-family: Galmuri11;
  font-size: 14px;
  font-weight: 400;

  &:hover {
    background: var(--dark-primary-color, #d645c7);
  }

  &:active {
    transform: translate(0px, 0px);
    box-shadow:
      -1px -1px 0px 0px var(--primary-black) inset,
      1px 1px 0px 0px #fff inset;
  }
`;
