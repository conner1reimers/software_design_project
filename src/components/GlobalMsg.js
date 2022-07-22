import React, { useContext } from 'react'
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { appContext } from '../App';
import check from '../util/img/check.svg';
import err from '../util/img/err.svg';
import { useEffect } from 'react';

const msgVariants = {
    initial: {
        x: '0%',
        y: '-10%',
        opacity: 0.3,
        scale: 1
    },
    out: {
        x: '-10%',
        y: '-10%',
        opacity: 0,
        scale: 0
    },
    in: {
  
        x: '0%',
        y: '0%',
        opacity: 1,
        scale: 1
    }
  };
  const msgTrans = {
    type: 'spring',
    mass: 1,
    damping: 21,
    stiffness: 120,
    velocity: 1
    
  };


const GlobalMsg = () => {
    let state = useContext(appContext);
    let imgSrc = check;

    

    useEffect(() => {
        if (state.globalMsg) {
            if (state.globalMsg.type === 'success') {
                imgSrc = check;
            } else if (state.globalMsg.type === 'error') {
                imgSrc = err;
            } 
        }
      
    }, [state])
    return ReactDOM.createPortal(
        <AnimatePresence>
            {state.appState.globalMsg && state.appState.globalMsg.active && (
            <motion.div 
                className={`global-msg`}
                initial="initial"
                animate="in"
                exit="out"
                variants={msgVariants}
                transition={msgTrans}
            >
                <div className={`global-msg--contain`}>
                    <div>
                        <span>{state.appState.globalMsg.msg}</span>
                        <img src={imgSrc} alt=""/>
                    </div>
                </div>
                
            </motion.div>)}
        </AnimatePresence>, document.getElementById('global-msg-hook')
    )
}

export default GlobalMsg
