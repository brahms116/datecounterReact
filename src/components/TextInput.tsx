import { useState } from "react"
import styles from "./TextInput.module.css"
import {motion} from 'framer-motion'

export default function TextInput(){

    const [isFocus,setIsFocus] = useState(false)
    const [error,setError] = useState("")
    const boxVariants = {
        blur:{
            //borderColor: getComputedStyle(document.documentElement).getPropertyValue('--inputBoxColor')
            borderColor:"var(--inputBoxColor)"
        },
        focus:{
            // borderColor: getComputedStyle(document.documentElement).getPropertyValue("--primaryColor") as string
            borderColor:"var(--primaryColor)"
        }
    }
    const handleFocus = ()=>{
        setIsFocus(!isFocus)
    }
    return(
        <div 
            className={styles.text_input} 
            onFocus={handleFocus} 
            onBlur={handleFocus}
        >
            <motion.div  
                animate={isFocus?"focus":"blur"} 
                variants={boxVariants}
                className={styles.input_box}
            >
                <input type="text" placeholder="EMAIL"></input>
                {/* {isFocus && <div className={styles.helper_text}>EMAIL</div>} */}
                <div className={styles.helper_text}>EMAIL</div>
            </motion.div>
            {error && <div className={styles.error_text}>
                INCORRECT CREDENTIALS
            </div>}
        </div>
    )
}