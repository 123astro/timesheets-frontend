import React, { Fragment, useContext } from 'react';
import NavButton from '../NavBar/NavButton'
import { AuthContext } from '../Providers/AuthProvider';


const Navbar = (props) => {
    const [auth] = useContext(AuthContext);


    return (
        <Fragment>
            <div style={{
                backgroundColor: "beige",
                position: 'fixed',
                width: '100%',
                zIndex: 9999,
                top: 0,
                left: 0,
                height: '75px',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <h1 style={{
                    fontFamily: "monospace",
                    fontWeight: 'bold',
                    fontSize: '1.50em',
                    margin: "0 20px"
                }}>TimeTrack</h1>
                <div style={{
                    margin: '0 20px',
                    flexDirection: 'row',
                    background: "transparent",
                    userSelect: "none",
                    alignItems: 'center',
                }}>
                    {auth.id ? ( // IF TRUTHY 
                        <p>Hi {auth.name}</p>
                    ) : null}
                    <NavButton to="/" label='Home' />
                    {auth.id ? (
                        <Fragment>
                            <NavButton to="/Clients" label='Clients' />
                            <NavButton to="/Billables" label='Billables' />
                            <NavButton to="/Matters" label='Matters' />
                            <NavButton to="/Timer" label='Start-Billable' />
                        </Fragment>
                    ) : (
                        <NavButton to="/login" label='Login' />

                    )}
                </div>
            </div>
            <div style={{ height: '75px' }} />
        </Fragment>
    )
}

export default Navbar;
