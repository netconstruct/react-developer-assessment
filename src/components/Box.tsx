import React, { ReactNode, FC } from "react";
import styled from 'styled-components';
import { layout, space, position, flexbox, typography, border, color,
  LayoutProps, PositionProps, FlexboxProps, TypographyProps, SpaceProps, BorderProps, ColorProps } from 'styled-system';

interface Props extends PositionProps, SpaceProps, LayoutProps, FlexboxProps, TypographyProps, BorderProps, ColorProps{
  children?: ReactNode;
  as?: string | keyof JSX.IntrinsicElements | React.ComponentType<any>;
  src?: string;
}

const Box = styled.div<Props>`
  ${position}
  ${space}
  ${color}
  ${layout}
  ${flexbox}
  ${typography}
  ${border}
`

const BoxComponent: FC<Props> = ({ children, ...props }) => {
  return <Box {...props}>{children}</Box>;
};

export default BoxComponent