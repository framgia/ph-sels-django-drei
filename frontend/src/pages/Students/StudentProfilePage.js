import React, { useEffect } from "react";
import {
  getStudentDetail,
  followStudent,
  unfollowStudent,
  getStudentActivityLog,
} from "../../redux/actions/student";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import Loading from "../../components/common/Loading";
import ActivityFeed from "../../components/common/ActivityFeed";
import { tempStrFunction } from "../../utils";

const StudentProfilePage = () => {
  const dispatch = useDispatch();
  const {
    student,
    total_followers,
    total_following,
    is_following,
    activityLogs,
  } = useSelector((state) => state.students);
  const { id } = useParams();
  const history = useHistory();
  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getStudentDetail(id));
    dispatch(getStudentActivityLog(id));
    userData.user_id === parseInt(id) && history.push("/");
  }, [dispatch, id, history, userData]);

  const followStudentAction = () => {
    is_following ? dispatch(unfollowStudent(id)) : dispatch(followStudent(id));
  };

  const filteredActivityLog = () => {
    let ownactivityLog = [];
    activityLogs &&
      activityLogs.map((log) => {
        if (log.resourcetype === "StudentFollowInformation") {
          log.follower.id === parseInt(id) && ownactivityLog.push(log);
        } else {
          log.student.id === parseInt(id) && ownactivityLog.push(log);
        }
        return null;
      });
    return ownactivityLog;
  };

  const displayLearnings = () => {
    let total_answer = 0;
    activityLogs &&
      activityLogs.map((log) => {
        if (log.resourcetype === "StudentLesson") {
          total_answer += parseInt(id) === log.student.id && log.total_answer;
        }
        return null;
      });

    return total_answer;
  };

  const renderProfile = () => {
    return student ? (
      <div className="ui two column grid" style={{ paddingTop: "30px" }}>
        <div className="six wide column">
          <img
            alt=""
            className="ui small image"
            src={tempStrFunction(student.avatar)}
          />{" "}
          <h4 className="ui header">
            {student.first_name + " " + student.last_name}
          </h4>
          <p>Followers: {total_followers}</p>
          <p>Following: {total_following}</p>
          <div className="ui label green">
            Learned items<div className="detail">{displayLearnings()}</div>
          </div>
          <br />
          <br />
          <button className="ui button primary" onClick={followStudentAction}>
            {is_following ? "Unfollow" : "Follow"}
          </button>
        </div>
        <div className="column">
          <ActivityFeed activityLogs={filteredActivityLog()} />
        </div>
      </div>
    ) : (
      <Loading />
    );
  };
  return <div>{renderProfile()}</div>;
};

export default StudentProfilePage;
