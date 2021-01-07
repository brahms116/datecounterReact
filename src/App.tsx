import React from "react";
import "./App.css";
import CoverItem from "./components/Coveritem";
//import Card from "./components/Card";
//import Checkbox from "./components/Checkbox";
import Dropdown from "./components/Dropdown";
import DropdownItem from "./components/DropdownItem";
import Tabs, { TabItem } from "./components/Tabs";

// import TextInput from "./components/TextInput";
// import Button from "./components/Button";
function App() {
    const handleChange = (index: number) => {};
    return (
        <div className="test_area">
            <Tabs onClick={handleChange}>
                <TabItem color="var(--primaryColor)" label="RED"></TabItem>
                <TabItem color="var(--primaryColor)" label="GREEN"></TabItem>
                <TabItem color="var(--primaryColor)" label="BLUE"></TabItem>
            </Tabs>
            {/* <CoverItem isSecondary /> */}
            {/* <Dropdown isLarge>
                <DropdownItem label="Helloworld" onClick={() => {}} />
                <DropdownItem label="world" onClick={() => {}} />
                <DropdownItem
                    label="Helloworldasdfajjjjjjjjjjjjjjjj"
                    onClick={() => {}}
                />
                <DropdownItem label="Helloworld" onClick={() => {}} />
            </Dropdown> */}
        </div>
    );
}

export default App;
