import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React, { useState, useEffect } from 'react';
import './Wishlist.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import api from '../../axios/api';
import { UserSliceState ,updateUserSuccess} from '../../redux/user/UserSlice';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import ICourse from '../../interface/course/Course';


function Wishlist(): JSX.Element {
  const [wishlistCourses, setWishlistCourses] = useState<ICourse[]>([]);
  const { currentUser }: UserSliceState = useSelector((state: RootState) => state.user);
  const [cartAdded, setCartAdded] = useState<boolean>(false);
  console.log(cartAdded)
  const [teacherNames, setTeacherNames] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const courses: ICourse[] = useSelector(
    (state: RootState) => state.course.courses
  ) as unknown as ICourse[]; // No need for type assertion
  const fetchTeacherName = async (teacherId: string) => {
    if (teacherNames[teacherId]) {
      return; // Already fetched
    }
    try {
      const response = await api.get(`/api/teacher/${teacherId}`);
      setTeacherNames(prevState => ({
        ...prevState,
        [teacherId]: response.data.data.username,
      }));
    } catch (error) {
      console.error(`Error fetching teacher with id ${teacherId}:`, error);
      setTeacherNames(prevState => ({
        ...prevState,
        [teacherId]: "Unknown",
      }));
    }
  };

  useEffect(() => {
    courses.forEach(course => {
      if (course.teacher_id) {
        fetchTeacherName(course.teacher_id);
      }
    });
  }, [courses]);
  useEffect(() => {
    const fetchWishlistCourses = async () => {
      try {
        if (currentUser && currentUser._id) {
           api.get(`/api/wishlist/get-wishlist/${currentUser._id}`)
            .then(response => {
              console.log(response.data);
              setWishlistCourses(response.data.wishlist);
            })
            .catch(error => {
              console.error('Error fetching wishlist courses:', error);
              // Handle error here, like displaying a message to the user
            })
            .finally(() => {
              setLoading(false); // Set loading state to false when the request is complete
            });
          
        }else{
          toast.error('you are not signin');
            navigate('/signin')

        }
      } catch (error) {
        console.error('Error :', error);
        // Handle error here, like displaying a message to the user
      } finally {
        setLoading(false);
      }
    };

    if (!currentUser) {
      toast.error('you are not signin');
      navigate('/signin');
    } else {
      fetchWishlistCourses();
    }
  }, [currentUser, navigate]);
  const handleAddToCart = async (courseId:string) => {

    if (currentUser) {
      const studentId = currentUser._id;

      // Make API call to add to cart
      api
        .post(`/api/cart/add-cart/${studentId}/${courseId}`)
        .then((response) => {
          setCartAdded(true);
          dispatch(updateUserSuccess(response.data));
        })
        .catch((error) => {
          console.log("Error adding course to cart:", error);
          // Handle error if necessary
        });
    } else {
      toast.error("you are not signin");
      navigate("/signin");
    }
  }

  const handleRemoveItem = (courseId:string) => {
    if(currentUser){
        const studentId=currentUser._id;

        // Make anapi call to the API to remove the item from the wishlist
       api.delete(`/api/wishlist/remove-wishlist/${studentId}/${courseId}`)
          .then(response => {
            console.log('Item removed from wishlist:', response.data);
            setWishlistCourses(prevCourses => prevCourses.filter(course => course._id !== courseId));
          })
          .catch(error => {
            console.error('Error removing item from wishlist:', error);
            // Handle error here, like displaying a message to the user
          });
    }else{
 
        toast.error('you are not signin');
        navigate('/signin')
    }
  };

  return (
// JSX structure
<div className="wishlist">
<Navbar/>
<ToastContainer />
<div className="wishlist-container">
  <h1>Wishlist</h1>
  {loading ? (
    <div>Loading...</div>
  ) : wishlistCourses && wishlistCourses.length > 0 ? (
    <div className="wishlist-table">
      <div className="wishlist-header">
    
       <div className="header-cell">Subject</div>
        <div className="header-cell">Teacher</div>
        <div className="header-cell">Course Title</div>
        <div className="header-cell">Prize</div>
        <div className="header-cell">Slot</div>
        <div className="header-cell">Available</div>
        <div className="header-cell">Action</div>
      </div>
      {wishlistCourses.map((course) => (
     <>

        <div key={course._id} className="wishlist-item">
            
          <div className="cell">{course.subject}({course.standard} - {course.syllabus})</div>
          <div className="cell">{course.teacher_id ? teacherNames[course.teacher_id] || "Loading..." : "Unknown"}</div>
          <div className="cell">{course.course_title}</div>
          <div className="cell">{course.prize}</div>
          <div className="cell">
            {course.slot.time} <br />
           <span  className="day-highlight">{course.slot.day.join('-')}</span> 
          </div>
          <div className="cell available">Yes</div>
          <div className="cell ">
      
            <Link to='/cart'> 
            <button className="add-to-cart-btn"  onClick={() => handleAddToCart(course._id)}   >Add Cart</button>
            </Link>
          </div>
          <div className="removeItemIcon" onClick={() => handleRemoveItem(course._id)}>
  <DeleteOutlineIcon/>
</div>
        </div>
     </>
      ))}
    </div>
  ) : (
    <div>No wishlist courses found.</div>
  )}
</div>
</div>
);

}

export default Wishlist;
