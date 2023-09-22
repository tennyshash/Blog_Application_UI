import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Base from '../Component/Base'
import userContext from '../context/userContext'
import { creatingCategory, loadAllCategories } from '../Services/category-service'
import { loadSinglePost, updatePostService, uploadPostImage } from '../Services/post-service'
import { Button, Card, CardBody,  Container, Form, Input, Label } from "reactstrap"
import JoditEditor from "jodit-react"

function UpdateBlog() {

    const editor=useRef(null)

    const {blogID} =useParams()

    const object=useContext(userContext)

    const navigate=useNavigate()
    
    const [post,setPost]= useState(undefined)

    const[categories,setCategories] =useState([])

    const [newCategory,setNewCategory] =useState({
        categoryTitle:''
    })
    
    const [image,setImage]=useState(null)


    useEffect( ()=>{

        loadAllCategories().then( (data)=>{
            //console.log(data)
            setCategories(data)
        } ).catch(error=>{
            //console.log(error)
        })

        //load blog from database

        loadSinglePost(blogID)
            .then(data=>{

                setPost({...data , categoryID: data.category.categoryID})
                //console.log(data)

            }).catch(error=>{
                toast.error("Cant Load Post")
                console.log(error)
            })
        
    },[])

    useEffect ( ()=>{
        console.log("First")

        if(post){
            // console.log(object)
            //console.log(post)
            if(post.user.userId != object.user.data.userId){
                toast.error("This is not Your Post .!! ")
                navigate("/")
            }
        }

    },[post])


    const submitNewCategory=()=>{
        
        //console.log(newCategory)

        creatingCategory(newCategory)
            .then(data=>{
                toast.success("Category Created")
                //console.log(data)

                setNewCategory({
                    content:""
                })
            })
            .catch(error=>{
                toast.error("Cant create")
                console.log(error)
            })
    }

    const handleChange=(event,fieldName)=>{

        setPost({
            ...post,
            [fieldName]:event.target.value
        })
        //console.log(post)
    }

    const updatePost=(event)=>{

        event.preventDefault()
        console.log(post)

        updatePostService( {...post, category:{ categoryID : post.categoryID} } , post.postID)
            .then( data=>{

                uploadPostImage(image,data.postID)
                    .then(data=>{
                        toast.success("Image Uploaded")
                    }).catch(error=>{
                        toast("Image Upload Failed")
                        console.log(error)
                    })

                //console.log(data)
                toast.success("Post Updated Successfully   .!")

            }).catch(error=>{

                console.log(error)
                toast.error("Unable to Update  .!")
            })

        
    }

    const updateHtml=()=>{

        return (
            <div className="wrapper" >

            <Card className="shadow mt-2" >
                <CardBody>
                
                {/* {JSON.stringify(post)} */}
                    <h4>Update Your Post From Here .!</h4>
                    <Form onSubmit={updatePost}>
                    
{/* Post Category */}

                    <Card className="mt-2">
                        <CardBody >
                            <div className="my-1">
                                <Label for="category" >Post Category </Label>
                                    <Input 
                                        type="select" 
                                        id="category"
                                        placeholder="Select Something.!" 
                                        name="categoryID"
                                        onChange={ (event)=> handleChange(event,'categoryID') }
                                        value={post.categoryID}
                                        
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
                                    placeholder="Create New Category here  with Min 4 Char !!"
                                    value={newCategory.categoryTitle}
                                    onChange={ (event)=> setNewCategory({categoryTitle:event.target.value } )}
                                />
                                <Button disabled={ (newCategory.categoryTitle==='')} className="mt-2" onClick={submitNewCategory}>Create</Button>
                       
                            </CardBody>
                    </Card>
{/* Post Title */}
                        <div className="my-3">
                            <Label for="title" >Post Title </Label>
                            <Input 
                                type="text " 
                                id="title"
                                name="title"
                                value={post.title}
                                onChange={ (event)=> handleChange(event,'title') }  
                                />
                        </div>
{/* Post Content */}
                        <div className="my-3">
                            <Label for="content" >Post Content </Label>
                            {/* <Input 
                                type="textarea" 
                                id="content"
                                placeholder="Enter here .!" 
                                style={ {height:'100px'} }  
                                /> */}
                            <JoditEditor 
                                ref={editor}
                                value={post.content}
                                onChange={ newConent=>setPost({...post, content:newConent})}
                            />
                        </div>
{/* File Upload */}           
                        <div className="mt-3">
                            <Label for="image"> Select Post Banner</Label>
                            <Label className="right">---------NOTE: Only JPG/PNG allowed .!!!</Label>
                            <Input  id="image"  type="file" onChange={  (event)=> setImage(event.target.files[0]) } />

                        </div>
                            
{/* Post Buttons */}
                        <Container className="text-center mt-3">

                            <Button type="submit" color="warning" >
                                Update Post
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

    return (
            <Base>
                <Container>
                    {
                        post && updateHtml()
                        
                    }
                </Container>
            </Base>
    )
}

export default UpdateBlog