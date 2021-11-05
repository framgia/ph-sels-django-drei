import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserDetails } from "../../redux/actions/user";
import ProfileForm from "./components/ProfileForm";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  const onSubmit = async (formObj, event) => {
    const formData = new FormData();
    if (formObj.hasOwnProperty("avatar")) {
      formData.append("avatar", formObj.avatar[0]);
    }
    if (formObj.hasOwnProperty("password")) {
      formData.append("password", formObj.password);
    }
    for (var key in formObj) {
      formData.append(key, formObj[key]);
    }
    dispatch(updateUserDetails(formData));
    event.reset();
  };

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  return (
    <div>
      <ProfileForm profile={profile} onSubmit={onSubmit} />
    </div>
  );
};

export default ProfilePage;
