import React, { useEffect } from "react";
import ProfileForm from "./components/ProfileForm";
import useStore from "../../store/useStore";
import { debounce } from "lodash";
const ProfilePage = () => {
  const profile = useStore((state) => state.profile);
  const getUserDetails = useStore((state) => state.getUserDetails);
  const updateUserDetails = useStore((state) => state.updateUserDetails);
  const status = useStore((state) => state.status);
  const setLoading = useStore((state) => state.setLoading);
  const clearMessages = useStore((state) => state.clearMessages);

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
    setLoading(true);
    debounce(() => updateUserDetails(formData), 300)();
    debounce(() => clearMessages(), 3000)();
    event.reset();
  };

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  return (
    <div>
      <ProfileForm profile={profile} onSubmit={onSubmit} status={status} />
    </div>
  );
};

export default ProfilePage;
