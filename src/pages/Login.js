import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../Component/Base";
import { loginUser } from "../Services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";

const Login = () => {

    const userContextData=useContext(userContext);

    const navigate=useNavigate()

    const [loginDetail,setLoginDetail]=useState({
        username:'',
        password:''
    })

    const handleChange=(event,field)=>{

        let actualValue=event.target.value
        setLoginDetail({
            ...loginDetail,[field]:actualValue
        })
    }

    const handleFormSubmit=(event)=>{
        event.preventDefault();
        console.log(loginDetail);

        // add validation if you want
        if(loginDetail.username.trim()=='' || loginDetail.password.trim()==''){
            toast.error("UserName or Password Field is Blank .!!")
            return;
        }

        //submit data to server to generate token
        loginUser(loginDetail)
            .then( (data)=>{

                console.log(data)
                toast.success("Login Success")

                // save data to local storage
                doLogin(data,()=>{
                    console.log("Login details is Saved to Local Storage")

                    userContextData.setUser({
                        data : data.user,
                        login: true
                    });

                    //redirect to user dashboard page
                    navigate("/user/dashboard")
                

                })
                
            } ).catch( (error) =>{

                console.log(error)
                if(error.response.status==400 || error.response.status==404){
                    toast.error(error.response.data.message)
                }else{
                    toast.error("Something Wrong  .!!")
                }
                
            })
    }

    const handleReset=(event)=>{
        setLoginDetail({
            username:'',
            password:'',
        })
    }

    return(
        <Base>
            <Container>
                <Row className="mt-4">
                    <Col sm={ {size:6 ,offset:3 } }>

                        <Card color="warning">
                            <CardHeader>
                                <h4>Login Here  !!</h4>
                            </CardHeader>

                            <CardBody>

                                {/* Creating Form */}
                                <Form onSubmit={handleFormSubmit}>

                                    {/* Email field */}
                                    <FormGroup>
                                        <Label for="email"> Enter Email</Label>
                                        <Input 
                                            type="email"
                                            id="email"
                                            placeholder="enter email"
                                            value={loginDetail.username}
                                            onChange={(e)=> handleChange(e,'username')}     // used for two way data binding in form

                                        />
                                    </FormGroup>

                                    {/* Password here */}
                                    <FormGroup>
                                        <Label for="password">Enter Password</Label>
                                        <Input
                                            type="password"
                                            id="password"
                                            placeholder="enter password"
                                            value={loginDetail.password}
                                            onChange={(e)=> handleChange(e,'password')}     // used for two way data binding in form

                                            />
                                    </FormGroup>

                                    {/* creating buttons */}
                                    <Container className="text-center">
                                        <Button  color="light"> Login </Button>
                                        <Button onClick={handleReset} outline color="dark" type="reset" className="ms-2">Reset</Button>
                                    </Container>

                                </Form>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>
        
    );
};

export default Login