import React, { useEffect } from "react";
import ActivityFeed from "../../components/common/ActivityFeed";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentActivityLog,
  getUserDetails,
} from "../../redux/actions/student";
const HomePage = () => {
  const dispatch = useDispatch();
  const { activityLogs } = useSelector((state) => state.students);
  const { userData } = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getStudentActivityLog(userData.user_id));
    dispatch(getUserDetails());
  }, [dispatch, userData.user_id]);

  const displayLearnings = () => {
    let total_lessons = 0;
    let total_answer = 0;
    activityLogs &&
      activityLogs.map((log) => {
        if (log.resourcetype === "StudentLesson") {
          if (userData.user_id === log.student.id) {
            total_lessons = log.total_lessons;
          }
          total_answer +=
            userData.user_id === log.student.id && log.total_answer;
        }
        return null;
      });

    return [total_lessons, total_answer];
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
            Learned lessons<div className="detail">{displayLearnings()[0]}</div>
          </div>
          <div className="ui label red">
            Learned items
            <div className="detail">{displayLearnings()[1]}</div>
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
