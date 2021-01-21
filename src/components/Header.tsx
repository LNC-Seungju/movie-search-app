import React from 'react';

interface HeaderProps {
  text: string;
}
const Header = (props: HeaderProps) => {
return (
    <header className="App-header">
      <div>{props.text}</div>
    </header>
  );
}

export default Header;