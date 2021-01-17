import React from "react";
import Button from "../components/Button";
import CoverItem from "../components/Coveritem";
import Dropdown from "../components/Dropdown";
import DropdownItem from "../components/DropdownItem";
import Tabs, { TabItem } from "../components/Tabs";
import Tile from "../components/Tile";
import styles from "./HomePage.module.css";
import logoIcon from "../media/Logo.svg";

export default function HomePage() {
    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <img
                        src={logoIcon}
                        alt="logo"
                        className={styles.logo_icon}
                    ></img>
                    DATE COUNTER
                </div>
                <div className={styles.navigation}>LOGOUT</div>
            </div>
            <div className={styles.main}>
                <div className={styles.title_section}>
                    HELLO
                    <div className={styles.title_sd_dropdown}>
                        <Dropdown>
                            <DropdownItem label="LOGOUT" onClick={() => {}} />
                        </Dropdown>
                    </div>
                    <div className={styles.title_ld_button}>
                        <Button text="ADD DATE" onClick={() => {}} />
                    </div>
                </div>
                <div className={styles.cover}>
                    <CoverItem />
                </div>
                <div className={styles.sd_tab}>
                    <Tabs onClick={(i) => {}}>
                        <TabItem
                            color="var(--primaryColor)"
                            label="DAYS TILL"
                        />
                        <TabItem
                            color="var(--secondaryColor)"
                            label="DAYS SINCE"
                        />
                    </Tabs>
                </div>
                <div className={styles.tile_sd}>
                    <TileSection />
                </div>
                <div className={styles.tile_ld}>
                    <div className={styles.primary_label}>DAYS TILL</div>
                    <div className={styles.secondary_label}>DAYS SINCE</div>
                    <div className={styles.primary_items}>
                        <TileSection />
                    </div>
                    <div className={styles.secondary_items}>
                        <TileSection />
                    </div>
                </div>
                <div className={styles.floating_button}>
                    <Button text="ADD DATE" onClick={() => {}}></Button>
                </div>
            </div>
        </div>
    );
}

function TileSection(props: { isSecondary?: boolean }) {
    return (
        <div className={styles.tile_section}>
            <Tile title="HELLO" numDays={4} id={3}></Tile>
            <Tile title="HELLO2" numDays={5} id={3}></Tile>
        </div>
    );
}
