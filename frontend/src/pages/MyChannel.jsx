import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";

const MyChannel = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (currentUser?.username) {
      const username = currentUser.username;
      navigate(`/channel/${username}`, { replace: true });
    }
  }, [currentUser]);

  return null;
};

export default MyChannel;
