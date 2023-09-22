import { useEffect, useState } from "react";
import { Container, Row , Col, Card, CardBody, Input} from "reactstrap";
import Base from "../Component/Base";
import CategorySideMenu from "../Component/CategorySideMenu";
import NewFeed from "../Component/NewFeed";
import  { FaSearch } from  'react-icons/fa'
import { Link } from "react-router-dom";

const Home = () => {

    const [input,setInput]=useState('')
    console.log(input)

    

    const handleChange=(value)=>{

        setInput(value)

    }

    return(
        <Base>
            <Row className=" border-0 mt-3" >
{/* Search Post By title */}
                <Col md={1} >
                    <Link to={`/post/title/${input}` } style={{ color: 'blue' }}>
                        <FaSearch className="mt-2" style={ {float:'right'}} id={'search-icon'}/>
                    </Link>
                </Col>
                <Col >
                    <div className="input-wrapper">
                        <Input 
                            id="input"
                            name="input"
                            placeholder="Type Here To Search Post"
                            style={ {width:400 ,  float:'center'} } 
                            value={input} 
                            onChange={ (event)=> handleChange(event.target.value)}
                        />
                    </div>
                </Col>
{/* Home */}
            </Row>
            <Container className="mt">
                <Row className="mt-2">
                    <Col md={3} className='pt-3 mt-4'>
                        <CategorySideMenu />
                    </Col>
                    <Col md={9}>
                        <NewFeed />
                    </Col>
                </Row>
            </Container>
        </Base>
    );
};

export default Home