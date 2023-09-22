import Base from "../Component/Base";
import userContext from "../context/userContext";

const About = () => {

    return (
        <userContext.Consumer>
            {
                (userObject)=>(
                    <Base>
                        <h1>This is about page</h1>
                        <p> we are building blog website</p>
                        <h3>Welcome User : { userObject.user.login && userObject.user.data.name} </h3>
                        {console.log(userObject)}
                    </Base>
                )
            }
        </userContext.Consumer>
    );

};

export default About;