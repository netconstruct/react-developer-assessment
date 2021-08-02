import React, { ReactNode, FC } from "react";
import styled from 'styled-components';
import { layout, space, position, flexbox, typography, LayoutProps, PositionProps, FlexboxProps, TypographyProps, SpaceProps } from 'styled-system';

interface Props extends PositionProps, SpaceProps, LayoutProps, FlexboxProps, TypographyProps {
  children: ReactNode;
  as?: string | keyof JSX.IntrinsicElements | React.ComponentType<any>;
}

const Box = styled.div<Props>`
  ${position}
  ${space}
  ${layout}
  ${flexbox}
  ${typography}
`

const BoxComponent: FC<Props> = ({ children, ...props }) => {
  return <Box {...props}>{children}</Box>;
};

export default BoxComponent