import React from "react";
import "./App.css";
import CoverItem from "./components/Coveritem";
//import Card from "./components/Card";
//import Checkbox from "./components/Checkbox";
import Dropdown from "./components/Dropdown";
import DropdownItem from "./components/DropdownItem";
// import TextInput from "./components/TextInput";
// import Button from "./components/Button";
function App() {
    return (
        <div className="test_area">
            <CoverItem isSecondary />
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
