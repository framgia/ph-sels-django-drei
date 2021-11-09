import React, { useEffect } from "react";

import ActivityFeed from "../../components/common/ActivityFeed";
import useStore from "../../store/useStore";
const HomePage = () => {
  const profile = useStore((state) => state.profile);
  const getUserDetails = useStore((state) => state.getUserDetails);
  const userData = useStore((state) => state.userData);

  const fetchStudentActivityLog = useStore(
    (state) => state.fetchStudentActivityLog
  );
  const activityLogs = useStore((state) => state.activityLogs);

  useEffect(() => {
    getUserDetails();
    fetchStudentActivityLog(userData.user_id);
  }, [getUserDetails, userData, fetchStudentActivityLog]);

  const displayLessons = () => {
    return (
      activityLogs?.length > 0 &&
      activityLogs.find(
        (log) => userData.user_id === log.student.id && log.total_lessons
      )
    );
  };
  const displayItems = () => {
    return (
      activityLogs?.length > 0 &&
      activityLogs.reduce(
        (total, log) =>
          userData.user_id === log.student.id && total + log.total_answer,
        0
      )
    );
  };

  return (
    <div className="ui two column grid">
      <div className="six wide column">
        <h3 className="ui header">Dashboard</h3>
        <div className="ui segment">
          <img
            className="ui top aligned tiny image"
            src={profile.avatar}
            alt=""
          />
          <h4 className="ui header">
            {profile.first_name + " " + profile.last_name}
          </h4>
          <div className="ui label green">
            Learned lessons
            <div className="detail">
              {displayLessons() && displayLessons().total_lessons}
            </div>
          </div>
          <div className="ui label red">
            Learned items
            <div className="detail">{displayItems()}</div>
          </div>
        </div>
      </div>
      <div className="ten wide column">
        <br />
        <div className="ui segment">
          <ActivityFeed
            activityLogs={activityLogs}
            user_id={userData.user_id}
            avatar={profile.avatar}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
