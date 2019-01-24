import React from 'react';
import styled from 'styled-components';
import StyledTextField from 'shared/styles/styledTextField';
import StyledBlock from 'shared/styles/styledBlock';
import AccountIcon from 'shared/components/icons/account';
import { colors, screen } from 'shared/styles/variables';
import { validateFirstName, validateLastName, validateEmail, validatePhone } from 'shared/components/bookingForm/validations';

const CustomerForm = ({
    handleInputChange,
    firstName,
    lastName,
    phone,
    email,
    displayError
}) => (
    <StyledBlock>
        <h3 className="title">
            <AccountIcon color={colors.gray} />
            <span>CUSTOMER</span>
        </h3>
        <Layout>
            <StyledTextField
                id="firstName"
                label="First name"
                type="text"
                error={displayError && !validateFirstName(firstName)}
                onChange={ e => handleInputChange(e.target.value, 'firstName') }
                value={firstName}
            />
            <StyledTextField
                id="lastName"
                label="Last name"
                type="text"
                error={displayError && !validateLastName(lastName)}
                onChange={ e => handleInputChange(e.target.value, 'lastName') }
                value={lastName}
            />
            <StyledTextField
                id="phone"
                label="Phone"
                type="text"
                error={displayError && !validatePhone(phone)}
                onChange={ e => handleInputChange(e.target.value, 'phone') }
                value={phone}
            />
            <StyledTextField
                id="email"
                label="E-mail"
                type="text"
                error={displayError && !validateEmail(email)}
                onChange={ e => handleInputChange(e.target.value, 'email') }
                value={email}
            />
        </Layout>
    </StyledBlock>
);

export default CustomerForm;

const Layout = styled.div`
    display: flex;
    flex-wrap: wrap;
    & > div {
        @media ${screen.tablet} { 
            width: 100%;
            margin-bottom: 10px;
         }
        width: 25%;
        padding: 0 10px 0 0;
    }
`;