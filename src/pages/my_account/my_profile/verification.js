import React from "react";
import LayoutContainer from "../../../components/commons/layout/LayoutContainer";
import VerifyUserIdentityMain from "../../../components/my_profile_page/edit_account_details_page/VerifyUserIdentityMain";

export default function EditAccountDetails() {
  return (
    <>
      <LayoutContainer
        title="Verify User Identity"
        description="This is verify user identity page of 'Daily Needs Grocery' web application!"
      >
        <VerifyUserIdentityMain />
      </LayoutContainer>
    </>
  );
}
