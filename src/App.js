import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import Base from './Component/Base';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UpdateBlog from './pages/UpdateBlog'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Services from './pages/Services';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserDashboard from './pages/user-routes/UserDashboard';
import PrivateRoute from './Component/PrivateRoute';
import ProfileInfo from './pages/user-routes/ProfileInfo';
import PostPage from './pages/PostPage';
import UserProvider from './context/UserProvider';
import Categories from './pages/Categories';
import UsersPost from './Component/user/UsersPost';
import UserProfile from './pages/UserProfile';
import PostByTitle from './Component/user/PostByTitle';
import UpdateProfile from './pages/user-routes/UpdateUserProfile';
import UserCategory from './pages/user-routes/UserCategory';
import Admin from './pages/Admin';


function App() {
  return (

    <UserProvider>
      <BrowserRouter>
        <ToastContainer  position='top-center' />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/about' element={<About />} />
            <Route path='/services' element={<Services />} />
            <Route path='/contact' element={<ContactUs/>} />
            <Route path='/posts/:postID' element={<PostPage/>} />
            <Route path='/categories/:categoryID' element={<Categories/>} />
                
            <Route path='/user-profile/:userId' element={<UserProfile/>} />
            <Route path='/user-profile/user-posts/:userId' element={<UsersPost/>} />
            <Route path='/user-profile/user-category/:userId' element={<UserCategory/>} />
            <Route path='/post/title/:input' element={<PostByTitle/>} />
            
            <Route path='/user' element={  <PrivateRoute />} >  
                <Route path='dashboard' element={  <UserDashboard />} />
                <Route path='admin' element={  <Admin />} />
                <Route path='profile-info/:userId' element={  <ProfileInfo />} />
                <Route path='update-blog/:blogID' element={<UpdateBlog/>} />
                <Route path='update-profile/:userId' element={<UpdateProfile/>} />
            </Route>

          </Routes>
      </BrowserRouter>
    </UserProvider>


  );
}


export default App;
