import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import StartPage from "./pages/StartPage";
import { motion } from "framer-motion";
import DataProvider from "./Contexts/DataProvider";
import HomePage from "./pages/HomePage";
import InsertPage from "./pages/InsertPage";

function App() {
    return (
        <DataProvider>
            <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                <Switch>
                    <Route exact path="/home">
                        <HomePage></HomePage>
                    </Route>
                    <Route exact path="/insert">
                        <InsertPage></InsertPage>
                    </Route>
                    <Route path="/">
                        <StartPage></StartPage>
                    </Route>
                </Switch>
            </motion.div>
        </DataProvider>
    );
}

export default App;
