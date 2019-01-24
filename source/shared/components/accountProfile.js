import React from 'react';
import StyledTextField from 'shared/styles/styledTextField';
import StyledBlock from 'shared/styles/styledBlock';
import AccountIcon from 'shared/components/icons/account';
import { colors } from 'shared/styles/variables';
import styled from 'styled-components';

const AccountProfile = ({ user }) => (
    <StyledBlock>
        <h3 className="title">
            <AccountIcon color={colors.gray} />
            <span>profile</span>
        </h3>
        <ContentWrapper>
            <StyledTextField value={`${user.firstName} ${user.lastName}`} label="Name" InputProps={{ disabled: true }} />
            <StyledTextField value={user.email} label="E-mail" InputProps={{ disabled: true }} />
            <StyledTextField value={user.mobileNumber} label="Phone" InputProps={{ disabled: true }} />
        </ContentWrapper>
    </StyledBlock>
);

export default AccountProfile;

const ContentWrapper = styled.div`
    & > div {
        width: 100%;
        max-width: 400px;
        margin-bottom: 15px;
    }
`;