import styled from 'styled-components';
import { theme } from '@/src/themes/client-layout';

const colors = {
  blue: theme.colors.primary.color3,
  bw1: theme.colors.neutral.color,
  bw2: theme.colors.neutral.color2,
  bw3: theme.colors.neutral.color3,
  bw4: theme.colors.neutral.color4,
  bw5: theme.colors.neutral.color5,
  bw6: theme.colors.neutral.color6,
  bw7: theme.colors.neutral.color7,
  bw8: theme.colors.neutral.color8,
};

interface Props {
  $width?: string;
  $color?: keyof typeof colors;
}

export const Line = styled.hr<Props>`
  margin: 0;
  width: ${({ $width }) => $width || '100%'};
  color: ${({ $color }) => colors[$color || 'bw3']};
  border-style: solid;
  border-width: 1px 0 0 0;
`;
