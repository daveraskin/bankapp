import React from "react";
import { User } from "../pages/Home";

const UserInfo = ({ userData }: { userData: User | null }) => {
  return userData ? (
    <React.Fragment>
      <h2 style={{ paddingBottom: "20px" }}>
        Welcome back, {userData.first_name}!
      </h2>
    </React.Fragment>
  ) : (
    <div> loading </div>
  );
};

export default UserInfo;
