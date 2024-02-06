import { createContext, useContext, useState } from "react";

const DalmajiContext = createContext();
// export default DalmajiContext;

const DalmajiContextProvider = ({children}) => {

    // sessionStorage.clear();

    const [loginMember, setLoginMember] = useState(null);
    const [AdminLoginMember, setAdminLoginMember] = useState(null);

    const obj = {
        loginMember ,
        AdminLoginMember ,
        setLoginMember ,
        setAdminLoginMember
    };


    if(!loginMember){
        const jsonStr = sessionStorage.getItem("loginMemberVo");
        console.log("loginMember jsonStr" , jsonStr);
        if(jsonStr !== null){
            const vo = JSON.parse(jsonStr);
            setLoginMember(vo);
        }
    }

    // console.log();
    if(!AdminLoginMember){
        const jsonStr = sessionStorage.getItem("AdminLoginMemberVo");
        console.log("AdminLoginMember jsonStr" , jsonStr);
        if(jsonStr !== null){
            const vo = JSON.parse(jsonStr);
            setAdminLoginMember(vo);
        }
    }

  return <DalmajiContext.Provider value={obj}>
      {children}
  </DalmajiContext.Provider>
}

const useDalmajiContext = () => {
    return useContext(DalmajiContext);
}

export {DalmajiContextProvider, useDalmajiContext};