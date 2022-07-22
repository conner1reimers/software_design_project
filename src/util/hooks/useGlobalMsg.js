import { useContext } from "react";
import { appContext } from '../../App';

export const useGlobalMsg = () => {
    let state = useContext(appContext);

    console.log(state.appState)
    const setGlobalMsgs = (msg, type, timeout) => {
      if(state.appState && state.appState.globalMsg) {
        if (state.appState.globalMsg.msg) {
            return;
          } else {
            state.setAppState(prevState => {
                return {
                    ...prevState,
                    globalMsg: {
                        msg: msg,
                        active: true,
                        type
                    }
                }
            })
    
            setTimeout(() => {
                state.setAppState(prevState => {
                    return {
                        ...prevState,
                        globalMsg: {
                            ...prevState.globalMsg,
                            active: false
                        }
                    }
                });
                setTimeout(() => {
                    state.setAppState(prevState => {
                        return {
                            ...prevState,
                            globalMsg: {
                                msg: "",
                                active: false,
                                type: ""
                            }
                        }
                    });
                }, 500);
              }, timeout || 2000);
          }
      }
      
        

    }
    
    return setGlobalMsgs;
}