import React from "react";

import ActivityLog from "./ActivityLog";

const ActivityFeed = ({ activityLogs, avatar, user_id }) => {
  const renderActivityLog = () => {
    if (activityLogs && activityLogs.length) {
      return activityLogs.map((log, index) => (
        <ActivityLog
          log={log}
          index={index}
          avatar={avatar}
          user_id={user_id}
          key={index}
        />
      ));
    } else {
      return <React.Fragment>No Logs yet</React.Fragment>;
    }
  };

  return <div className="ui feed">{renderActivityLog()}</div>;
};

export default ActivityFeed;
