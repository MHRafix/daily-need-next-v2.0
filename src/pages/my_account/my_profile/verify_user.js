import React from "react";
import LayoutContainer from "../../../components/commons/layout/LayoutContainer";
import VerifyUserDetailsMain from "../../../components/my_profile_page/verify_user_page/VerifyUserDetailsMain";

export default function Verifyuser() {
  return (
    <>
      <LayoutContainer
        title="Verify User"
        description="This is verify user page of 'Daily Needs Grocery' web application!"
      >
        <VerifyUserDetailsMain />
      </LayoutContainer>
    </>
  );
}
