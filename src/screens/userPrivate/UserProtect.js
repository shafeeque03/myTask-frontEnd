import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProtect = ({ component: Component, path, permissions, ...rest }) => {
    const { routerLinks } = useSelector((state) => state.userReducer);
    // console.log(routerLinks,"77777")

    // Function to check if the user has access to a route
    const canAccessRoute = (route) => {
        console.log(route,"calling athhh")
        let splited = route.split('/');
        let actualPath = splited[splited.length-1];
        console.log(actualPath,"calling actual path")
        return routerLinks.includes(actualPath); // Adjust this based on how your permissions are structured
    };

    return (
        <Route
            path={path}
            {...rest}
            render={(props) =>
                canAccessRoute(path) ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/unauthorized" />
                )
            }
        />
    );
};

export default UserProtect;
