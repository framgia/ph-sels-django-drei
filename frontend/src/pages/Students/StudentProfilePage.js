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
    return (
      activityLogs &&
      activityLogs.filter((log) => {
        return log.resourcetype === "StudentFollowInformation"
          ? log.follower.id === parseInt(id)
          : log.student.id === parseInt(id);
      })
    );
  };

  const displayItems = () => {
    return (
      activityLogs &&
      activityLogs.reduce(
        (total, log) =>
          parseInt(id) === log.student.id && total + log.total_answer,
        0
      )
    );
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
            Learned items<div className="detail">{displayItems()}</div>
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
