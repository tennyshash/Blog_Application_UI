import Base from "../Component/Base"
import userContext from "../context/userContext";

const Services =()=>{
    return(
        <userContext.Consumer>
            {
                (userObject)=>(
                    <Base>
                        <h1>This is Services Page</h1>
                        <h3>Welcome User : {userObject.user.login && userObject.user.data.name} </h3>
                    </Base>
                )
            }
        </userContext.Consumer>
    )
}

export default Services;