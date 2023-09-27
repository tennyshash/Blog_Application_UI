
// is logged in=>

    export const isLoggedIn=()=>{
        let data=localStorage.getItem("data");
        if(data!=null)  return true;
        else   return false;
    };

//do login => data=> set to local storage

    export const doLogin=(data,next)=>{
        localStorage.setItem("data",JSON.stringify(data));
        next()
    };

//do logout=> remove from localstorage

    export const doLogout=( next )=>{
        localStorage.removeItem("data");
        next()
    };

//  get current user
    
    export const getCurrentUser=()=>{
        if(isLoggedIn ()){
            return JSON.parse(localStorage.getItem("data") )?.user;
        }
        else return undefined;
    };

// get token
     export const getToken=()=>{
        if(isLoggedIn()){
            return JSON.parse(localStorage.getItem("data")).token
        }else{
            return null;
        }
     }

// Is Admin 
     export const isAdmin=()=>{

        const user=getCurrentUser();
        {
            if( user?.roles[0]?.roleName === "ROLE_ADMIN"){
                return true
            } else{ return false }
        }
     }