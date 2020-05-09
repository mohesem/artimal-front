import React, { useState, useEffect, createRef } from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";

import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
// import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
// import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import routes from "routes.js";

var ps;

export default (props) => {
  console.log(".....................", props);
  const [state, setState] = useState({
    backgroundColor: "black",
    activeColor: "info",
  });

  const mainPanel = createRef();

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }, [mainPanel]);

  useEffect(() => {
    return () => {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  }, []);

  useEffect(() => {
    if (props.history.action === "PUSH") {
      mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  });

  // const handleActiveClick = (color) => {
  //   setState({ ...state, activeColor: color });
  // };
  // const handleBgClick = (color) => {
  //   setState({ ...state, backgroundColor: color });
  // };

  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={routes}
        bgColor={state.backgroundColor}
        activeColor={state.activeColor}
      />
      <div className="main-panel" ref={mainPanel}>
        <DemoNavbar {...props} />
        <Switch>
          {routes.map((prop, key) => {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          })}
        </Switch>
        {/* <Footer fluid /> */}
      </div>
      {/* <FixedPlugin
        bgColor={state.backgroundColor}
        activeColor={state.activeColor}
        handleActiveClick={handleActiveClick}
        handleBgClick={handleBgClick}
      /> */}
    </div>
  );
};
