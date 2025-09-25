import styled from '@emotion/styled';
import '@/assets/font.css';
import skeleton from '@/assets/skeleton.png';

export const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background-color: var(--light-primary-color);
  background-image: url(${skeleton});
  background-size: cover;
`;
export const ErrorImg = styled.img`
  width: 13.75rem;
  height: 13.75rem;
  padding-right: 2rem;
`;
export const ErrorSet = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;
`;
export const informationSet = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const ErrorCode = styled.div`
  font-family: 'Galmuri11';
  font-weight: bold;
  font-size: 1.25rem;
  letter-spacing: 5%;
`;
export const DetaileCode = styled.div`
  font-family: 'Galmuri11';
  font-size: 0.725rem;
`;
export const DetailResponseCode = styled.div`
  font-family: 'Galmuri11';
  font-size: 0.85rem;
`;
export const RequestText = styled.div`
  color: #d591d7;
  font-family: 'Galmuri11';
  font-size: 0.725rem;
`;
export const DemandSet = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
