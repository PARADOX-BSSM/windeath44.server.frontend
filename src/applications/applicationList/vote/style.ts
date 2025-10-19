import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffd3fb;
  padding: 0.125rem;
  box-sizing: border-box;

  padding: 20px;
`;

export const Main_Display = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;

  padding-top: 1px;
`;

export const Balance = styled.img`
  width: 387px;
  height: 353px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Info = styled.div`
  width: 262px;
  height: 134px;

  display: flex;
  gap: 16px;
  margin-left: 20px;
  margin-top: 19px;
`;

export const Profile_Div = styled.div`
  width: 110px;
  height: 134px;
`;

export const Profile = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Name_Div = styled.div`
  width: 166px;
  height: 79px;

  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const CName = styled.div`
  width: 100%;
  font-family: DOSIyagiBoldface;
  font-size: 21px;
`;
export const AName = styled.div`
  width: 100%;
  font-family: Galmuri11;
  font-size: 15px;
`;

/*===============================================================================*/

export const Main_Vote_Live = styled.div`
  width: 374px;
  height: 72px;

  display: flex;

  justify-content: space-between;

  position: absolute;

  position: absolute;

  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding-right: 5px;
`;

export const Live_Div = styled.div`
  width: 115px;
  height: 72px;

  position: relative;
`;

export const Live_Back = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffc6f7;

  border-radius: 100px;
  opacity: 50%;
`;

export const Live_Text = styled.div`
  font-family: DOSIyagiBoldface;
  font-size: 33px;
  color: black;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

/*===============================================================================*/

export const Vote_Btn_Div = styled.div`
  width: 431px;
  height: 68px;

  padding-top: 290px;
  padding-right: 3px;

  display: flex;
  justify-content: space-between;

  position: absolute;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
