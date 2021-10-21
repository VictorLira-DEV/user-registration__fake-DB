import React from 'react';

const NavContext = React.createContext({
    onMenuOption: () => {},
    onFilter: () => {}
});

export default NavContext;