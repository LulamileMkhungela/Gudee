import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../components/requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
 // const [error, setError] = useState("");
  try {

    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    //console.log(res.data);
  } catch (err) {
  console.log(err);
  //dispatch(loginFailure());
  }
};

// export const fetchAllUsers = async (token) => {
//   const res = await axios.get('/user/all_infor', {
//       headers: {Authorization: token}
//   })
//   return res
// }