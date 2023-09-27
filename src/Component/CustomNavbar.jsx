import { useContext, useEffect, useState } from 'react';
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';
import { doLogout, getCurrentUser, isAdmin, isLoggedIn } from '../auth';
import userContext from '../context/userContext';

const CustomNavbar = () => {


  let navigate=useNavigate()

  const userContextData=useContext(userContext);

  const [isOpen,setIsOpen]=useState(false)

  const [login,setLogin]=useState(false)

  const [user,setUser]=useState(undefined)

  useEffect( ()=> {

    setLogin( isLoggedIn() )
    setUser( getCurrentUser() )
  
  },[login])

  const logout=()=>{
    
      doLogout( ()=>{
        
          //logged out
          setLogin(false)

          userContextData.setUser({

              data:null,
              login:false
              
          });
          navigate("/")

      } )
  }

  return (
    <div>
      <Navbar

        color='warning'
        light
        expand="md"
        fixed='top' 
        className='px-5'
      >
        <NavbarBrand tag={ReactLink} to="/" >
            MyBlogs
        </NavbarBrand>
        <NavbarToggler onClick={ ()=>setIsOpen(!isOpen) } />
        
        <Collapse isOpen={isOpen}  navbar>
          <Nav className="me-auto" navbar >  
                      {/* className="me-auto " is moving all links like login about inside this nav to right. */}
            
            <NavItem>
              <NavLink tag={ReactLink} to="/" >
                    New Feed
              </NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink tag={ReactLink} to="/about" >
                    About
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={ReactLink} to="/services" >
                    Services
              </NavLink>
            </NavItem>
    
            <UncontrolledDropdown inNavbar nav>
              <DropdownToggle  caret nav>
                More
              </DropdownToggle>
              <DropdownMenu right>
                
                <DropdownItem tag={ReactLink} to="/contact">
                    Contact Us
                </DropdownItem>

                <DropdownItem divider />

                <DropdownItem tag={ReactLink} to='https://github.com/tennyshash'>GitHub</DropdownItem>
                <DropdownItem>Swagger UI</DropdownItem>
                <DropdownItem tag={ReactLink}  to='https://www.linkedin.com/in/shashwatpratap-parihar/'>LinkedIn</DropdownItem>

              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>

            {
              login  && (
                  <>
                  {
                    user.isAdmin ? 

                    <NavItem>
                      <NavLink tag={ReactLink} to={`/user/admin`}>
                        Admin Services
                      </NavLink>
                    </NavItem>
                                : ''
                  }

                  {
                    isAdmin() ?
                    <NavItem>
                      <NavLink col tag={ReactLink} to={`/user/admin`}>
                        Admin Services
                      </NavLink>
                    </NavItem>   : ''
                  }
                  
                  <NavItem>
                    <NavLink tag={ReactLink} to={`/user/profile-info/${user.userId}`}>
                      Profile Info
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink  tag={ReactLink} to="/user/dashboard">
                      { user.email}
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <Button outline color="dark" onClick={logout} >
                      Logout
                    </Button>
                  </NavItem>

                  </>
              )
            }
            {
              !login  && (
                  <>
                    <NavItem>
                      <NavLink tag={ReactLink} to="/login" >
                        Login
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink tag={ReactLink} to="/signup" >
                        Signup
                      </NavLink>
                    </NavItem>
                  </>
              )
            }
            
          </Nav>
        </Collapse>
      </Navbar>
      <Card  className='border-0' color='red'>
        <CardBody>
            <CardHeader>
              
            </CardHeader>
        </CardBody>
      </Card>
    </div>
    
  );
}

export default CustomNavbar;