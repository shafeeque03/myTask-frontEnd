import React from "react";
import { Switch, withRouter } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import AuthIndex from "./screens/AuthIndex";
import MainIndex from "./screens/MainIndex";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";

function App(props) {
  const { routerLinks } = useSelector((state) => state.userReducer);
  function activekey() {
    var res = window.location.pathname
    var baseUrl = process.env.PUBLIC_URL
    baseUrl = baseUrl.split("/");
    res = res.split("/");
    res = res.length > 0 ? res[baseUrl.length] : "/";
    res = res ? "/" + res : "/";;
    const activeKey1 = res;
    return activeKey1
  }

  if (activekey() === "/sign-in" || activekey() === "/sign-up" || activekey() === "/password-reset" || activekey() === "/2-step-authentication" || activekey() === "/page-404") {
    return (
      <div id="mytask-layout" className="theme-indigo">
        <Switch>
          <AuthIndex />
        </Switch>
      </div>
    )
  }
  return (
    <>
<ToastContainer/>
    <div id="mytask-layout" className="theme-indigo">
      <Sidebar activekey={activekey()} history={props.history} />
      <Switch>
      <MainIndex activekey={activekey()} permissions={routerLinks} />

      </Switch>
    </div>
    </>
  );
}


export default withRouter(App);
