import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import GoogleImg from "../../assets/images/google.svg";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/Slice/UserSlice";
import { toast } from "react-toastify";
import { loginApi } from "../../api/roleAndUserApi";
import menuData from "../Data/menu.json"; // Assuming your menu data is imported from a file

function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submitLogin(event) {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await loginApi(email, password);
      if (res?.status === 200) {
        console.log("response is 200");
        const { token, user } = res.data;

        // Extract permissions from user roles
        const permissions = user?.roles?.flatMap(role => role.permission);
        console.log("Permissions:", permissions);

        // Function to recursively collect router links of children
        const collectRouterLinks = (menu, permissions) => {
          let routerLinks = [];
          menu.forEach(item => {
            if (permissions.includes(item.identifier) && item.children) {
              item.children.forEach(child => {
                routerLinks = [...routerLinks, ...child.routerLink];
                if (child.children && child.children.length > 0) {
                  routerLinks = [...routerLinks, ...collectRouterLinks(child.children, permissions)];
                }
              });
            }
          });
          return routerLinks;
        };

        const routerLinks = collectRouterLinks(menuData.menu, permissions);
        console.log("Router Links:", routerLinks);

        localStorage.setItem("userToken", token);
        dispatch(
          userLogin({
            token: token,
            user: user,
            permissions: permissions || [], // Ensure permissions is an array
            routerLinks: routerLinks || [], // Ensure routerLinks is an array
          })
        );
        history.push("/");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response?.data?.message, "response in error");
      toast.error(error.response?.data?.message || "An error occurred");
    }
  }

  return (
    <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
      <div className="w-100 p-3 p-md-5 card border-0 bg-dark text-light" style={{ maxWidth: "32rem" }}>
        <form className="row g-1 p-3 p-md-4" onSubmit={submitLogin}>
          <div className="col-12 text-center mb-1 mb-lg-5">
            <h1>Sign in</h1>
            <span>Free access to our dashboard.</span>
          </div>
          <div className="col-12 text-center mb-4">
            <a className="btn btn-lg btn-outline-secondary btn-block" href="#!">
              <span className="d-flex justify-content-center align-items-center">
                <img className="avatar xs me-2" src={GoogleImg} alt="Image Description" />
                Sign in with Google
              </span>
            </a>
            <span className="dividers text-muted mt-4">OR</span>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <div className="form-label">
                <span className="d-flex justify-content-between align-items-center">
                  Password
                  <Link className="text-secondary" to="password-reset">Forgot Password?</Link>
                </span>
              </div>
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="***************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Remember me
              </label>
            </div>
          </div>
          <div className="col-12 text-center mt-4">
            <button type="submit" className="btn btn-lg btn-block btn-light lift text-uppercase" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
          <div className="col-12 text-center mt-4">
            <span className="text-muted">Don't have an account yet? <Link to="sign-up" className="text-secondary">Sign up here</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
