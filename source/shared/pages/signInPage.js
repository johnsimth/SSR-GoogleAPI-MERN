import React from 'react';
import SignInForm from 'shared/components/signInForm';
import FlexCenter from 'shared/styles/flexCenter';
//console.log('login page');
const SignInPage = ({ params }) => (
    <FlexCenter>
        <SignInForm token={params.token} />
    </FlexCenter>
);

export default SignInPage;