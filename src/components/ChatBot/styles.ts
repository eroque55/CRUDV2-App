import styled from 'styled-components';

export const ClosedContainer = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  height: 56px;
  width: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary.color3};
  border-radius: 999px;
  box-shadow: ${({ theme }) => theme.colors.other.shadow};
  cursor: pointer;

  &:hover {
    filter: ${({ theme }) => theme.colors.other.hoverFilter};
  }
`;

export const OpenContainer = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  height: 500px;
  width: 400px;
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.colors.other.shadow};
  background-color: ${({ theme }) => theme.colors.neutral.color};
`;

export const ChatBotHeader = styled.div`
  display: flex;
  padding: 12px;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.neutral.color2};
  box-shadow: ${({ theme }) => theme.colors.other.shadow};
`;

export const ChatBotTitle = styled.h3`
  font-size: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral.color8};
`;

export const MessagesContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
  gap: 12px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.neutral.color3};
    border-radius: 4px;
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
`;
