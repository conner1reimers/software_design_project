import { useHttpClient } from "./http-hook";

export const useCheckCookie = (setAppState, setPageState) => {
    const {sendRequest} = useHttpClient();
    const checkCookie = async () => {
        let response;
        try {
          response = await sendRequest("http://localhost:5000/api/users/checkcookie");
          if(response.msg === "cookie found") {
            if(response.userInfo) {
              setPageState("home");
              setAppState((prevState) => {
                return{
                  ...prevState,
                  uid: response.uid,
                  hasPreviousPurchase: response.hasPreviousPurchase,
                  userInfo: response.userInfo,
                  userInfoSet: true
              }});
            } else {
              setPageState("user");
              setAppState((prevState) => {
                return {
                  ...prevState,
                  uid: response.uid,
                  hasPreviousPurchase: false,
                  userInfo: null,
                  userInfoSet: false
              }});
            }
          }
        } catch(err) {console.log(err)}
      };

    return checkCookie;
}