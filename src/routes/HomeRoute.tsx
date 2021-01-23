import { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { dataContext } from "../Contexts/DataContext";

interface props extends RouteProps {
    children: React.ReactNode;
}
export default function HomeRoute({ children, ...rest }: props) {
    const appData = useContext(dataContext);
    return (
        <Route
            {...rest}
            render={() => {
                if (!appData.state.isAuth) return <Redirect to="/" />;
                else if (appData.state.items.length === 0)
                    return <Redirect to="/insert" />;
                else return children;
            }}
        />
    );
}
