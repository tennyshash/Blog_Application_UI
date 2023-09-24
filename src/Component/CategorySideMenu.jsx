import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories } from '../Services/category-service'
import { Link } from 'react-router-dom'

function CategorySideMenu() {

    const [categories,setCategories]=useState([])

    useEffect(()=>{

        loadAllCategories()
            .then(data=>{
                setCategories([...data])
                
                //console.log(data)
            }).catch(error=>{
                toast.error(error.response.data.message)
                //console.log(error)
                //toast.error("Error in loading categories")
            })
    },[])

    return (
        <div>
            <ListGroup>
                <ListGroupItem tag={Link} to='/' action={true} className='border-0 shadow mt-1'>
                    All Blogs Categories .!
                </ListGroupItem>
                {
                    categories && categories.map( (cat,index) =>{
                        return(
                            <ListGroupItem tag={Link} to= { '/categories/'+ cat.categoryID} key={index} action={true} className='border-0 shadow mt-1'>
                               {cat.categoryTitle}
                            </ListGroupItem>
                        )
                    })
                }
            </ListGroup>
        </div>
    )
}

export default CategorySideMenu
