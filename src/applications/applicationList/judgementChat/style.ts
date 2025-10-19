import styled from "@emotion/styled";

export const Container = styled.div`

  width: 100%;
  height: 100%;
  background-color: #ffd3fb;
  
  box-sizing: border-box;
  padding-top:10px;
  padding-left:30px;
  padding-right:32px;
  padding-bottom:15px;

`;

/* =============================================================== */

export const Input_Sep = styled.div`
    width:100%;
    height:100%;
   
`;


export const Chat_Back = styled.div`
    width:100%;
    height:92.9%;

`;

export const Input_Div = styled.div`

    margin-top:2px;

    width: 100%;
    min-height:35px;
    background-color:white;

    display:flex;
`;

export const Input = styled.input`
    width:640px;
    height: 36px;

    background-color:#FFEBFD;

    font-size : 16px;
    font-family: 'Galmuri11';

    padding: 0 4px;
    padding-left:20px;
    outline: none;

    border-color: #CA91B9;
    border-style: solid;
    border-width: 1px;
    
    border-left:none;
    border-right:none;
    border-bottom:none;

    box-sizing: border-box;
    cursor: none;

    ::placeholder {
        color : #DCAFDD;
    }

`;

export const Submit_Btn = styled.div`
    width:92px;
    height:35px;
    background-color:#FFEBFD;
    display:flex;
    border-color: #CA91B9;
    border-style:solid;
    border-width: 1px;
    
    border-bottom:none;
    border-left:none;
    border-right:none;

    justify-content:center;
    align-items:center;

    padding-right:23px;

`;


/* =============================================================== */

export const Title_Div = styled.div`
    width:100%;
    height:52px;

    margin-bottom:10px;

    display:flex;

    justify-content:space-between;
`;

export const Title_Text = styled.div`
    margin-left:10px;

    line-height: 72px;

    font-family:Galmuri11;
    font-size:28px;
`;

export const Select_Div = styled.div`
    width:72px;
    height:32px;
    padding-top:18px;
    padding-right:30px;
`;







export const Discussion = styled.div`
    width:100%;
    height: calc(100% - 60px);
    background-color:#CCA9C9;

    overflow-y:scroll;
    display:flex;
    flex-direction:column;
    gap:1px;
`;