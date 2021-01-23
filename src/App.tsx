import React from "react";
import "./App.css";
import { Route, Switch, useLocation } from "react-router-dom";
import StartPage from "./pages/StartPage";
import { motion } from "framer-motion";
import HomePage from "./pages/HomePage";
import InsertPage from "./pages/InsertPage";
import DataContext from "./Contexts/DataContext";
import HomeRoute from "./routes/HomeRoute";
import InsertRoute from "./routes/InsertRoute";

function App() {
    const location = useLocation();
    let key: string;
    if (location.pathname === "/home") key = "home";
    else if (location.pathname === "/insert") key = "insert";
    else key = "start";
    console.log(location.pathname);
    return (
        <DataContext>
            <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                <Switch location={location} key={key}>
                    <HomeRoute exact path="/home">
                        <HomePage></HomePage>
                    </HomeRoute>
                    <InsertRoute exact path="/insert">
                        <InsertPage></InsertPage>
                    </InsertRoute>
                    <Route path="/">
                        <StartPage></StartPage>
                    </Route>
                </Switch>
            </motion.div>
        </DataContext>
    );
}

export default App;
