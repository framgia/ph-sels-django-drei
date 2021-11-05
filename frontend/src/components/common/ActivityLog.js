import React from "react";
import { timeSince } from "../../utils";
import { Link } from "react-router-dom";
const ActivityLog = ({ log, avatar, user_id }) => {
  const renderFollowLog = (log) => {
    let startText = "You";
    let endText = "You";

    if (log.follower.id !== user_id) {
      startText = log.follower.first_name;
      return (
        <>
          <Link to={`/students/profile/${log.follower.id}`}>{startText}</Link>{" "}
          {log.is_following ? "followed" : "unfollowed"} {endText}
        </>
      );
    }
    if (log.follower.id === user_id) {
      endText = log.student.first_name;
      return (
        <>
          {startText} {log.is_following ? "followed" : "unfollowed"}{" "}
          <Link to={`/students/profile/${log.student.id}`}>{endText}</Link>
        </>
      );
    }
  };

  const renderLessonLog = (log) => {
    let text = "You";
    if (log.student.id !== user_id) {
      text = log.student.first_name;
    }
    return (
      <>
        <Link to={`/students/profile/${log.student.id}`}>{text} </Link> learned{" "}
        {log.total_answer} of {log.total_items} in {log.category.title}{" "}
      </>
    );
  };

  const renderAvatar = (log) => {
    if (log.resourcetype === "StudentFollowInformation") {
      return log.follower.id !== user_id ? log.follower.avatar : avatar;
    } else {
      return log.student.id !== user_id ? log.student.avatar : avatar;
    }
  };
  return (
    <div className="event">
      <div className="label">
        <img src={renderAvatar(log)} alt="" />
      </div>
      <div className="content">
        <div className="date">{timeSince(log.created)}</div>
        <div className="summary">
          {log.resourcetype === "StudentFollowInformation"
            ? renderFollowLog(log)
            : renderLessonLog(log)}
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
