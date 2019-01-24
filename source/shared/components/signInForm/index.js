import React from 'react';
import styled from 'styled-components';

import TextField from 'shared/styles/styledTextField';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { signInUser, meFromToken } from 'shared/modules/user';
import { StyledButton } from 'shared/styles/styledButton';
import StyledProgress from 'shared/styles/styledProgress';
import { colors } from 'shared/styles/variables';
import ResetPassword from 'shared/components/signInForm/resetPassword';

class SignInForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            emailValue: '',
            passwordValue: '',
        };
        const { token, loadUserFromToken } = this.props;
        if (token) {
            loadUserFromToken(token);
        }
    }
    componentDidUpdate() {
        const { user } = this.props;
        if (user.status === 'signin' && !user.user && user.error && !this.state.error) {
            this.setState({ error: 'There was a problem signing you in, please try again.' });
        }
        if (user.status === 'authenticated' && user.user && !user.error) {
            browserHistory.push('/business/dashboard');
        }
    }
    render() {
        const { user, submitLoginInfo } = this.props;
        const { emailValue, passwordValue, error } = this.state;
        if (user.loading) return <StyledProgress size={24} />;
        return (
            <Wrapper>
                <img 
                    src="https://staging.transfervans.co.nz/business/static/images/logo_full.png" // TODO: replace image
                    alt="transfervans"
                />
                <TextField
                    label="Email"
                    type="text"
                    value={emailValue}
                    onChange={e => this.setState({ emailValue: e.target.value })}
                />
                <TextField
                    label="Password"
                    type="password"
                    value={passwordValue}
                    onChange={e => this.setState({ passwordValue: e.target.value })}
                />
                { !user.loading &&
                    <div className="buttonWrapper">
                        <StyledButton
                            onClick={() => submitLoginInfo({ email: emailValue, password: passwordValue })}
                        >Sign In</StyledButton>
                    </div>
                }
                { error && <p role="alert">{error}</p> }
                <ResetPassword />
            </Wrapper>
        );
    }
}

export default connect(
    ({ user }) => ({ user }),
    dispatch => ({
        submitLoginInfo: formValues => dispatch(signInUser(dispatch, formValues)),
        loadUserFromToken: token => dispatch(meFromToken(dispatch, token)),
    }),
)(SignInForm);

const Wrapper = styled.div`
    width: 320px;
    border-radius: 5px;
    background-color: ${colors.white};
    padding: 24px 32px 24px 32px;
    box-shadow: 0px 9px 19px 0px rgba(0, 0, 0, 0.14);
    & > img {
        width: 220px;
        display: block;
        margin: 0 auto 12px auto;
        padding-right: 20px;
    }
    & > div {
        margin-bottom: 18px;
    }
    & > .buttonWrapper {
        text-align: center;
        margin-bottom: 0;
    }
    & > p {
        color: ${colors.red};
        margin: 20px 0 0 0;
        text-align: center;
    }
`;