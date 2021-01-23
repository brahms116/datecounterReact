import React, { createContext, useContext, useState } from "react";
import Button from "../components/Button";
import CoverItem from "../components/Coveritem";
import Dropdown from "../components/Dropdown";
import DropdownItem from "../components/DropdownItem";
import Tabs, { TabItem } from "../components/Tabs";
import Tile from "../components/Tile";
import styles from "./HomePage.module.css";
import logoIcon from "../media/Logo.svg";

import { useHistory } from "react-router-dom";
import { dataContext } from "../Contexts/DataContext";
import convertItems, {
    convertCoverItem,
    IConvertedDateItem,
} from "../utils/convertDateItem";
import TransitionDiv from "../utils/TransitionDiv";
import { motion, useAnimation } from "framer-motion";
import PageSpinner from "../components/PageSpinner";
import swapPresence from "../utils/swapPresence";

interface ITileContext {
    onSetCover: (id: number) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

export const tileContext = createContext({} as ITileContext);

export default function HomePage() {
    const appData = useContext(dataContext);

    const history = useHistory();

    const pageController = useAnimation();
    const spinnerController = useAnimation();
    const handleLogout = () => {
        appData.events.logout();
        history.push("/");
    };

    const onSetCover = async (id: number) => {
        // console.log(id);
        await swapPresence(pageController, spinnerController);
        const result = await appData.events.assignCoverItem(id);
        // console.log(result);
        if (!result.error) {
            await swapPresence(spinnerController, pageController);
        }
    };
    const onDelete = async (id: number) => {
        await swapPresence(pageController, spinnerController);
        const result = await appData.events.deleteItem(id);
        if (!result.error) {
            await swapPresence(spinnerController, pageController);
        }
    };

    //mode 0 = days till, mode 1 = days since
    const [mode, setMode] = useState(0);

    return (
        <TransitionDiv>
            <motion.div initial={{ display: "none", opacity: 0 }}>
                <PageSpinner />
            </motion.div>
            <motion.div className={styles.page}>
                <div className={styles.header}>
                    <div className={styles.logo}>
                        <img
                            src={logoIcon}
                            alt="logo"
                            className={styles.logo_icon}
                        ></img>
                        DATE COUNTER
                    </div>
                    <div className={styles.navigation} onClick={handleLogout}>
                        LOGOUT
                    </div>
                </div>
                <div className={styles.main}>
                    <div className={styles.title_section}>
                        HELLO
                        <div className={styles.title_sd_dropdown}>
                            <Dropdown>
                                <DropdownItem
                                    label="LOGOUT"
                                    onClick={handleLogout}
                                />
                            </Dropdown>
                        </div>
                        <div className={styles.title_ld_button}>
                            <Button
                                text="ADD DATE"
                                onClick={() => {
                                    history.push("/insert");
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.cover}>
                        <CoverItem
                            item={convertCoverItem(appData.state.coverItem)}
                        />
                    </div>
                    <div className={styles.sd_tab}>
                        <Tabs
                            onClick={(i) => {
                                setMode(i);
                            }}
                        >
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
                    <tileContext.Provider value={{ onSetCover, onDelete }}>
                        <div className={styles.tile_sd}>
                            <TileSection
                                items={
                                    mode === 0
                                        ? convertItems(appData.state.items)
                                              .daysTill
                                        : convertItems(appData.state.items)
                                              .daysSince
                                }
                                isSecondary={mode === 1}
                            />
                        </div>
                        <div className={styles.tile_ld}>
                            <div className={styles.primary_label}>
                                DAYS TILL
                            </div>
                            <div className={styles.secondary_label}>
                                DAYS SINCE
                            </div>
                            <div className={styles.primary_items}>
                                <TileSection
                                    items={
                                        convertItems(appData.state.items)
                                            .daysTill
                                    }
                                />
                            </div>
                            <div className={styles.secondary_items}>
                                <TileSection
                                    isSecondary
                                    items={
                                        convertItems(appData.state.items)
                                            .daysSince
                                    }
                                />
                            </div>
                        </div>
                    </tileContext.Provider>
                    <div className={styles.floating_button}>
                        <Button
                            text="ADD DATE"
                            onClick={() => {
                                history.push("/insert");
                            }}
                        ></Button>
                    </div>
                </div>
            </motion.div>
        </TransitionDiv>
    );
}

function TileSection(props: {
    isSecondary?: boolean;
    items: IConvertedDateItem[];
}) {
    if (props.items.length === 0) {
        return (
            <TransitionDiv className={styles.empty_state}>
                NO ITEMS HERE YET, ADD A DATE TO SEE ONE!
            </TransitionDiv>
        );
    }
    return (
        <TransitionDiv className={styles.tile_section}>
            {props.items.map((item) => {
                return (
                    <Tile
                        isSecondary={props.isSecondary}
                        title={item.title}
                        numDays={item.daysDiff}
                        id={item.id}
                        key={item.id}
                    />
                );
            })}
        </TransitionDiv>
    );
}
