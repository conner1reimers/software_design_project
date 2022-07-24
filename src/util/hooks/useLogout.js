import { useHttpClient } from "./http-hook";

export const useLogout = (setAppState, setPageState, initState) => {
    const {sendRequest} = useHttpClient();
    const logout = async () => {
        let response;
        try {
          response = await sendRequest("http://localhost:5000/api/users/logout");
          if(response.msg) {
            setAppState(initState);
            setPageState("login");
          }
        } catch(err) {console.log(err)}
      };

    return logout;
}