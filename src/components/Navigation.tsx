import React, { ReactNode } from "react";
import {
  useLocation
} from "react-router-dom";
 
import Box from "../components/Box";
 
import { StyledNavigationItem, StyledNavigation } from '../styled'

interface NavigationItemProps {
  children: ReactNode;
  to?: string;
  selected?: boolean;
}

function NavigationItem({children, to = "/", selected = false}: NavigationItemProps) {
  return (
    <StyledNavigationItem to={to} $selected={selected}>
      {children} 
    </StyledNavigationItem>
  )
}


type NanigationItemsType = Array<{title: any, path: any, count?: number}>
interface Props {
  navigationItems: NanigationItemsType;
}

function Navigation({navigationItems}: Props) {
  const { pathname } = useLocation();

  return (
  <StyledNavigation>
    {navigationItems.map(({title, path, count}: any) => (
      <NavigationItem key={path} to={path} selected={pathname === path}>
        <Box>{title}</Box>
        {count && <Box borderRadius="15px" p="2px" bg="#2196f3" color="white">{count }</Box>}
      </NavigationItem>
    ))}
  </StyledNavigation>
  )

}

export default Navigation;
