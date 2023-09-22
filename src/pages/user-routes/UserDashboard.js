
import { Container } from 'reactstrap'
import AddPost from '../../Component/AddPost'
import Base from '../../Component/Base'
import UsersPost from '../../Component/user/UsersPost'



const UserDashboard=()=> {

 
  return (
    <Base>
      <div>
        <Container>
          <AddPost /> 
        </Container>
      </div>
    </Base>
  )
}

export default UserDashboard
