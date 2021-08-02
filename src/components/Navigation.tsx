import React, { ReactNode } from "react";
import {
  useLocation
} from "react-router-dom";
 
 
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


type NanigationItemsType = Array<{title: any, path: any}>
interface Props {
  navigationItems: NanigationItemsType;
}

function Navigation({navigationItems}: Props) {
  const { pathname } = useLocation();

  return (
  <StyledNavigation>
    {navigationItems.map(({title, path}: any) => (
      <NavigationItem key={path} to={path} selected={pathname === path}>
        {title}
      </NavigationItem>
    ))}
  </StyledNavigation>
  )

}

export default Navigation;
