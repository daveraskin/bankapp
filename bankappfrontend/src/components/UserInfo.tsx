import React from "react";
import { User } from "../pages/Home";

const UserInfo = ({ userData }: { userData: User | null }) => {
  const formatName = (name: string | undefined) => {
    if (typeof name === "string") {
      const nameArray = name.split("");
      nameArray[0] = nameArray[0].toUpperCase();
      return nameArray.join("");
    }
  };
  return userData ? (
    <React.Fragment>
      <h2 style={{ paddingBottom: "10px" }}>
        Happy Banking, {formatName(userData.first_name)}!
      </h2>
    </React.Fragment>
  ) : (
    <div> loading </div>
  );
};

export default UserInfo;
