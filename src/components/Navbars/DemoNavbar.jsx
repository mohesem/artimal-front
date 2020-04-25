import React, { useState, createRef, useEffect } from "react";
import { Link } from "react-router-dom";
import momentJalaali from "moment-jalaali";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from "reactstrap";

// components
import AddMewAnimalModal from "../Modals/newAnimal";

const jDate = momentJalaali().format("jYYYY/jM/jD");

export default (props) => {
  /* -------------------------------------------------------------------------- */
  /*                                   states                                   */
  /* -------------------------------------------------------------------------- */
  const [state, setState] = useState({
    isOpen: false,
    dropdownOpen: false,
    color: "transparent",
  });

  // clock
  const [time, setTime] = useState(new Date());
  // modals
  const [animalModalOpen, setAnimalModalOpen] = useState(false);

  const sidebarToggle = createRef();

  const toggle = () => {
    if (state.isOpen) {
      setState({
        ...state,
        color: "transparent",
      });
    } else {
      setState({
        ...state,
        color: "dark",
      });
    }
    setState({
      ...state,
      isOpen: !state.isOpen,
    });
  };
  const dropdownToggle = () => {
    setState({
      ...state,
      dropdownOpen: !state.dropdownOpen,
    });
  };

  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  // useEffect(() => {
  //   const updateColor = () => {
  //     if (window.innerWidth < 993 && state.isOpen) {
  //       setState({
  //         ...state,
  //         color: "dark",
  //       });
  //     } else {
  //       setState({
  //         ...state,
  //         color: "transparent",
  //       });
  //     }
  //   };
  //   window.addEventListener("resize", updateColor());

  //   function clearEvents() {
  //     window.removeEventListener("resize", updateColor());
  //   }

  //   return () => clearEvents();
  // }, [state]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (
      window.innerWidth < 993 &&
      props.history.location.pathname !== props.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  });

  const handleNewAnimalModalOpen = () => {
    // console.log("handle modal close");
    setAnimalModalOpen(!animalModalOpen);
  };

  return (
    // add or remove classes depending if we are on full-screen-maps page or not
    <>
      <Navbar
        color={
          props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "dark"
            : state.color
        }
        expand="lg"
        className={
          props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute fixed-top"
            : "navbar-absolute fixed-top " +
              (state.color === "transparent" ? "navbar-transparent " : "")
        }
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref={sidebarToggle}
                className="navbar-toggler"
                onClick={() => openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            {/* <NavbarBrand ></NavbarBrand> */}
          </div>
          <NavbarToggler onClick={toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse
            isOpen={state.isOpen}
            navbar
            className="justify-content-end"
          >
            <p>
              {time.toLocaleTimeString()} ساعت -- {jDate}
              {/* <InputGroup className="no-border">
              <Input placeholder="Search..." />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="nc-icon nc-zoom-split" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup> */}
            </p>
            <Nav navbar>
              <NavItem>
                <Link
                  className="nav-link btn-magnify"
                  onClick={handleNewAnimalModalOpen}
                >
                  <i className="nc-icon nc-simple-add" />
                  <p>
                    <span className="d-lg-none d-md-block">Stats</span>
                  </p>
                </Link>
              </NavItem>
              <Dropdown
                nav
                isOpen={state.dropdownOpen}
                toggle={(e) => dropdownToggle(e)}
              >
                <DropdownToggle caret nav>
                  <i className="nc-icon nc-bell-55" />
                  <p>
                    <span className="d-lg-none d-md-block">Some Actions</span>
                  </p>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag="a">Action</DropdownItem>
                  <DropdownItem tag="a">Another Action</DropdownItem>
                  <DropdownItem tag="a">Something else here</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <NavItem>
                <Link to="#pablo" className="nav-link btn-rotate">
                  <i className="nc-icon nc-settings-gear-65" />
                  <p>
                    <span className="d-lg-none d-md-block">Account</span>
                  </p>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <AddMewAnimalModal
        handleClose={handleNewAnimalModalOpen}
        isOpen={animalModalOpen}
      />
    </>
  );
};
