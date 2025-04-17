import styled from 'styled-components';
import '@/assets/font.css';

export const tempMain = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
`;

export const tempImageStyle = styled.div`
    width: 100%;
    height: 180px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
`;

export const tempBulkStyle = styled.div`
    width: 100%;
    height: 10px;
    background-color: #FFBBF5;
`;

export const tempMainStyle = styled.div`
    background-color: #FFD3FB;
    width: 100%;
    height: 100%;
    position: relative;
`;

export const tempInputsStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    font-family: "Galmuri11";
    padding: 20px;
`;

export const tempButtonsStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 20px;
    gap: 10px;
    position: absolute;
    bottom: 0;
    right: 0;
`;

export const tempButtonStyle = styled.button`
    width: 144px;
    height: 42px;
    font-size: 20px;
    line-height: 12px;
    font-family: "Galmuri11";
`;
 export const inputsDiv = styled.div`
     width: 100%;
     display: flex;
     justify-content: space-between;
 `;
export const inputs = styled.input`
     width: 80%;
    height: 1.5rem;
 `;
