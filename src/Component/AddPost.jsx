import { useEffect, useMemo, useRef, useState } from "react"
import { Button, Card, CardBody, Col, Container, Form, Input, Label, Row } from "reactstrap"
import { creatingCategory, loadAllCategories } from "../Services/category-service"
import JoditEditor from "jodit-react"
import { createNewPost, uploadPostImage } from "../Services/post-service"
import { getCurrentUser } from "../auth"
import { toast } from "react-toastify"

const AddPost=()=>{

    const editor=useRef(null)

    const[categories,setCategories] =useState([])

    const[user,setUser]=useState(undefined)

    const [post,setPost] =useState({
        title:'',
        content:'',
        categoryID:''
    })

    const [image,setImage]=useState(null) 
    
    const [newCategory,setNewCategory] =useState({
        categoryTitle:''
    })

    useEffect(
        ()=>{

            setUser(getCurrentUser())

            loadAllCategories().then( (data)=>{
                //console.log(data)
                setCategories(data)
            } ).catch(error=>{
                toast.error(error.response.data.message)
                //console.log(error)
            })

        },[]
    )

    // field change function
    const fieldChange=(event)=>{
        //console.log(event)
            setPost( {...post,[event.target.name]:event.target.value} )
    }
    const contentFieldChange=(data)=>{
        setPost({...post,'content':data})
    }

    // create post func

    const createPost=(event)=>{

        event.preventDefault();

        //console.log(post)
        if(post.title.trim()===''){
            toast.error("Post Title Required")
            return;
        }

        if(post.content.trim()===''){
            toast.error("Post Content Required")
            return;
        }
        if(post.categoryID ===''){
            toast.error("Select something from Category")
            return;
        }

        //submit form on server

        post['userId'] = user.userId;
    
        createNewPost(post).then(data=>{

            uploadPostImage(image,data.postID)
                .then(data=>{
                    toast.success("Image Uploaded")
                }).catch(error=>{
                    toast.error(error.response.data.message)
                    // toast.error("Image Upload Failed")
                    console.log(error)
                })

            toast.success("Post Created ")
            

            setPost({
                title:'',
                content:'',
                categoryID:''
            })
            
            //console.log(post)
        }).catch( (error) =>{
            toast.error(error.response.data.message)
            //toast.error("Post Not Created ")
            //console.log(error)
        })

    }

    // Handling File Change Event / Image upload
    const handleFileChange=(event)=>{
        //console.log(event.target.files[0])
        setImage(event.target.files[0])
    }
    
    const submitNewCategory=()=>{
        
        //console.log(newCategory)

        creatingCategory(newCategory)
            .then(data=>{
                toast.success("Category Created")
                console.log(data)

                setNewCategory({
                    content:""
                })
            })
            .catch(error=>{
                toast.error(error.response.data.message)
                // toast.error("Cant create")
                // console.log(error)
            })
    }

    return(
        <div className="wrapper" >

            <Card className="shadow mt-2" >
                <CardBody>
                
                {/* {JSON.stringify(post)} */}
                    <h4>What going in Your mind ?</h4>
                    <Form onSubmit={createPost}>
                    
{/* Post Category */}

                    <Card className="mt-2">
                        <CardBody >
                            <div className="my-1">
                                <Label for="category" >Post Category </Label>
                                <Label className="ms-1" style={ {color: 'red' } }>*</Label>
                                    <Input 
                                        type="select" 
                                        id="category"
                                        placeholder="Select Something" 
                                        name="categoryID"
                                        onChange={fieldChange}
                                        defaultValue={0}
                                        
                                        >
                                        <option disabled value={0}>--Select Category--</option>

                                        {
                                            categories.map((category)=>(
                                                <option value={category.categoryID} key={category.categoryID}>
                                                    {
                                                        category.categoryTitle
                                                    }
                                                </option>                                        
                                            ))
                                        }                               

                                    </Input>
                            </div>
                        <div className="center">
                            <h6>    OR  </h6>
                        </div>
{/* Create Category */}                        
                    
                            
                                <Input 
                                    type="text" 
                                    placeholder="Create New Category here "
                                    value={newCategory.categoryTitle}
                                    onChange={ (event)=> setNewCategory({categoryTitle:event.target.value } )}
                                />
                                <Button disabled={ (newCategory.categoryTitle==='')} className="mt-2" onClick={submitNewCategory}>Create</Button>
                       
                            </CardBody>
                    </Card>
{/* Post Title */}
                        <div className="my-3">
                            <Label for="title" >Post Title </Label>
                            <Label className="ms-1" style={ {color: 'red' } }>*</Label>
                            <Input 
                                type="text " 
                                id="title"
                                placeholder="Enter here " 
                                name="title"
                                onChange={fieldChange}  
                                />
                        </div>
{/* Post Content */}
                        <div className="my-3">
                            <Label for="content" >Post Content </Label>
                            <Label className="ms-1" style={ {color: 'red' } }>*</Label>
                            {/* <Input 
                                type="textarea" 
                                id="content"
                                placeholder="Enter here .!" 
                                style={ {height:'100px'} }  
                                /> */}
                            <JoditEditor 
                                ref={editor}
                                value={post.content}
                                onChange={contentFieldChange}
                            />
                        </div>
{/* File Upload */}           
                        <div className="mt-3">
                            <Label for="image"> Select Post Banner</Label>
                            <div><Label ><b>NOTE: Only JPG/PNG allowed </b></Label></div>
                            <Input  id="image"  type="file" onChange={handleFileChange} />

                        </div>
                            
{/* Post Buttons */}
                        <Container className="text-center mt-3">

                            <Button type="submit" color="warning" >
                                Create Post
                            </Button>

                            <Button type="reset" color="dark" className="ms-2" >
                                Reset Content
                            </Button>

                        </Container>
                       
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default AddPost