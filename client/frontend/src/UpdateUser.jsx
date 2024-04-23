import axios from "axios";
import { useEffect, useState } from "react";
import { updateUser } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State to hold user data and loading/error state
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    age: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    // Fetch user data on component mount
    const fetchUser = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const user = users.find((u) => u.id === parseInt(id));
        if (user) {
          setUserData(user);
        } else {
          setError('User not found');
        }
      } catch (err) {
        setError('Failed to fetch user');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [users, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      await axios.put(`http://localhost:8080/api/users/${id}`, userData);
      dispatch(updateUser(userData));
      navigate('/');
    } catch (err) {
      setError('Failed to update user');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Update User</h2>
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Name"
              className="form-control"
              value={userData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              className="form-control"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="age">Age</label>
            <input
              type="text"
              id="age"
              name="age"
              placeholder="Enter Age"
              className="form-control"
              value={userData.age}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-success" disabled={isLoading}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;