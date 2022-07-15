import React from "react";
import ProfileContentLayout from "../../../utilities/ProfileContentLayout";
import VerificationForm from "./EditAccountDetails/VerificationForm";

export default function VerifyUserIdentityContent() {
  return (
    <>
      <ProfileContentLayout content_title="verify user identity">
        <VerificationForm />
      </ProfileContentLayout>
    </>
  );
}
