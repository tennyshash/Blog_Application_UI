import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Col, Container, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../Component/Base";
import { signUp } from "../Services/user-service";
import { toast } from "react-toastify";
const Signup = () => {



    const [data,setData ]=useState({

        name:'',
        email:'',
        password:'',
        about:'',

    })

    const [error, setError]=useState({

        errors:{},
        isError:false
    })

    // useEffect(()=>{          used to show output of value entered in form
    //     console.log(data);
    // },[data])

    // handle change
    const handleChange=(event,property)=>{

        // dynamic setting values
        setData({ ...data,[property]:event.target.value})

        // console.log("name changed");
        // console.log(event.target.value)
    }

    //resettinng form
    const resetData=()=>{
        setData({
            name:'',
            email:'',
            password:'',
            about:'',
        })
    }
    
    //submit form
    const submitForm=(event)=>{
        event.preventDefault()

        // if(error.isError){
        //     toast.error("Form data is invalid, check all details")
        //     setError({ ...error,isError:false})
        //     return;
        // }

        // console.log(data);
        //data validate

        //call server api to send data
        signUp(data).then( (response)=> {

            console.log(response)
            console.log("success log")
            toast.success("User Registered Successfully ..!! ")
            setData({
                name:'',
                email:'',
                password:'',
                about:'',
            })

        }).catch( (error)=>{
            console.log(error)
            toast.error(error.response.data.message)
            // handle errors in proper way

            setError({
                errors:error,
                isError:true
            })
        } )
    }

    return(
        <Base>

            <Container>
                <Row className="mt-4">

                    {/* {JSON.stringify(data)}  -> to out put what we are typing */}

                    <Col    sm={ {size:6, offset:3} } >
                        <Card color="warning" >
                            <CardHeader>
                                <h4>Fill Information to Register  !!</h4>
                            </CardHeader>
                            <CardBody>

                                {/* creting form   */}

                                <form onSubmit={submitForm}>

                                    {/* Name Field */}
                                    <FormGroup>
                                        <Label for="name"> Enter Name</Label>
                                        <Input 
                                            type="text" 
                                            placeholder="Enter here"
                                            id="name"

                                            onChange={ (e)=>handleChange(e,'name')}        // used for two way data binding in form
                                            value={data.name}
                                            invalid={error.errors?.response?.data?.name ? true: false}

                                            />
                                        
                                        <FormFeedback>
                                                { error.errors?.response?.data?.name }
                                        </FormFeedback>

                                    </FormGroup>

                                    {/* Email Field */}
                                    <FormGroup>
                                        <Label for="email"> Enter email</Label>
                                        <Input 
                                            type="email" 
                                            placeholder="Enter here"
                                            id="email"
                                            //invalid="true"

                                            onChange={ (e)=>handleChange(e,'email')}        // used for two way data binding in form
                                            value={data.email}
                                            invalid={error.errors?.response?.data?.email ? true: false}
                                            
                                            />
                                            <FormFeedback>
                                                { error.errors?.response?.data?.email }
                                            </FormFeedback>

                                    </FormGroup>

                                    {/* Password Field */}
                                    <FormGroup>
                                        <Label for="password"> Enter password</Label>
                                        <Input 
                                            type="password" 
                                            placeholder="Enter here"
                                            id="password"

                                            onChange={ (e)=>handleChange(e,'password')}
                                            value={data.password}
                                            invalid={error.errors?.response?.data?.password ? true: false}
                                            
                                            />
                                            <FormFeedback>
                                                { error.errors?.response?.data?.password }
                                            </FormFeedback>

                                    </FormGroup>

                                    {/* About Field */}
                                    <FormGroup>
                                        <Label for="about"> Write about yourself</Label>
                                        <Input 
                                            type="textarea" 
                                            placeholder="Enter here"
                                            id="about"
                                            style={ {height:"150px"} }

                                            onChange={ (e)=>handleChange(e,'about')}
                                            value={data.about}
                                            invalid={error.errors?.response?.data?.about ? true: false}
                                            
                                            />
                                            <FormFeedback>
                                                { error.errors?.response?.data?.about }
                                            </FormFeedback>
                                            

                                    </FormGroup>

                                    <Container className="text-center">
                                        <Button outline color="dark">   Register    </Button>
                                        <Button onClick={resetData} outline color="secondary" type="reset" className="ms-2">    Reset   </Button>
                                    </Container>
                                    
                                </form>

                            </CardBody>

                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>
        
    );
};

export default Signup