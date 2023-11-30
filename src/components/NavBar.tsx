interface NavBarProps {
  children: React.ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({ children }) => {
  return <nav className='nav-bar'>{children}</nav>;
};

export default NavBar;
