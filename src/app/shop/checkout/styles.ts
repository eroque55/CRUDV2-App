import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.neutral.color2};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2rem 2.5rem;
  gap: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.color3};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.color3};
`;

export const StepContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface StepProps {
  $active?: boolean;
}

export const Step = styled.div<StepProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 10rem;
  gap: 0.5rem;

  color: ${({ theme, $active }) =>
    $active ? theme.colors.neutral.color8 : theme.colors.neutral.color5};
  font-size: 1.5rem;
`;

export const StepBallContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
`;

export const StepBall = styled.div<StepProps>`
  width: ${({ $active }) => ($active ? '3rem' : '1.75rem')};
  height: ${({ $active }) => ($active ? '3rem' : '1.75rem')};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary.color3 : theme.colors.neutral.color5};

  color: ${({ theme }) => theme.colors.neutral.color};
`;

export const MainContainer = styled.div`
  display: flex;
  flex: 1;
  gap: 2rem;
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1.25rem;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.25rem;

  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral.color3};

  color: ${({ theme }) => theme.colors.neutral.color8};
  font-size: 1.25rem;
`;

interface OptionProps {
  $selected?: boolean;
}

export const OptionContainer = styled.div<OptionProps>`
  display: flex;
  justify-content: flex-start;
  padding: 0.75rem;
  gap: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;

  background-color: ${({ $selected }) =>
    $selected ? '#B5D2DF' : 'transparent'};

  border: 1px solid
    ${({ theme, $selected }) =>
      $selected ? theme.colors.primary.color3 : theme.colors.neutral.color4};
`;

export const OptionText = styled.p`
  font-weight: 500;
  flex: 1;
`;

export const OptionDescription = styled.p`
  flex: 1;
  color: ${({ theme }) => theme.colors.neutral.color5};
`;

export const OptionValue = styled.p`
  text-align: right;
  color: ${({ theme }) => theme.colors.primary.color3};
`;

export const ResumeContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral.color4};
  padding: 1.25rem;
  height: fit-content;

  color: ${({ theme }) => theme.colors.neutral.color8};
  font-size: 1.25rem;
  font-weight: 600;
`;

export const ResumeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ResumeContent = styled.div`
  padding: 0 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral.color6};
`;

export const ResumeButtonsContainer = styled.div`
  display: flex;
  gap: 1.25rem;
  justify-content: flex-end;
  padding-left: 50%;
`;

export const TotalValueContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.25rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.neutral.color8};
  padding-right: 2.5rem;
`;

export const BookContainer = styled.div`
  display: flex;
  gap: 1.25rem;

  align-items: center;

  font-size: 1rem;
  color: ${({ theme }) => theme.colors.neutral.color6};
`;

export const ImageContainer = styled.div`
  display: flex;
  width: 8rem;
  height: 8rem;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.colors.neutral.color2};
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
`;

export const PlusOptionContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: transparent;

  border: 1px solid ${({ theme }) => theme.colors.neutral.color4};

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral.color2};
  }
`;

export const CoupomContainer = styled.div`
  display: flex;
  gap: 1.25rem;
`;

export const CoupomInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral.color4};
  background-color: transparent;

  color: ${({ theme }) => theme.colors.neutral.color8};
  font-size: 1rem;

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.neutral.color2};
    color: ${({ theme }) => theme.colors.neutral.color5};
  }
`;

export const CreditCardsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`;
