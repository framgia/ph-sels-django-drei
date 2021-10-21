import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { getStudentDetail, followStudent } from "../actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Loading from "../components/Loading";
import ActivityFeed from "../components/ActivityFeed";
const StudentProfilePage = () => {
  const dispatch = useDispatch();
  const { student, total_followers, total_following, is_following } =
    useSelector((state) => state.students);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getStudentDetail(id));
  }, [dispatch, id]);

  const tempStrFunction = (str) =>
    "https://" + str.substring(31, str.length) &&
    "https://semantic-ui.com/images/avatar/large/justen.jpg";

  const followStudentAction = () => {
    dispatch(followStudent(id));
  };

  const renderProfile = () => {
    return student ? (
      <div className="ui two column grid" style={{ paddingTop: "30px" }}>
        <div className="six wide column">
          <img
            className="ui small image"
            src={tempStrFunction(student.avatar)}
            alt=""
          />{" "}
          <h4 className="ui header">
            {student.first_name + " " + student.last_name}
          </h4>
          <p>Followers: {total_followers}</p>
          <p>Following: {total_following}</p>
          <button className="ui button primary" onClick={followStudentAction}>
            {is_following ? "Unfollow" : "Follow"}
          </button>
        </div>
        <div className="column">
          <ActivityFeed />
        </div>
      </div>
    ) : (
      <Loading />
    );
  };
  return (
    <div>
      <Navbar />
      {renderProfile()}
    </div>
  );
};

export default StudentProfilePage;
