import styled from 'styled-components';

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const MainContainer = styled.section`
  display: grid;
  padding: 2rem 2.5rem;
  justify-content: center;
  gap: 2.5rem;
  flex: 1;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;
