import { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { dataContext } from "../Contexts/DataContext";

interface props extends RouteProps {
    children: React.ReactNode;
}
export default function InsertRoute({ children, ...rest }: props) {
    const appData = useContext(dataContext);
    return (
        <Route
            {...rest}
            render={() =>
                appData.state.isAuth ? children : <Redirect to="/" />
            }
        />
    );
}
