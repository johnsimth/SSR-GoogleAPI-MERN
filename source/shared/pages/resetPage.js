import React from 'react';
import Ajax from 'client/ajax';
import TextField from 'shared/styles/styledTextField';
import { StyledButton } from 'shared/styles/styledButton';
import FlexCenter from 'shared/styles/flexCenter';
import { Link } from 'react-router';

class ResetPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            message: '',
            done: false,
        }
        this.requestResetPassword = this.requestResetPassword.bind(this);
    }
    requestResetPassword() {
        const { password, confirmPassword } = this.state;
        const [result, message] = validatePassword(password, confirmPassword);
        if (result) {
            Ajax.post('/api/user/reset', { password, token: this.props.params })
            .then(() => {
                this.setState({ done: true });
            })
            .catch(error => {
                this.setState({ message: error.message });
            });
        } else {
            this.setState({ message });
        }
    }
    render () {
        const { password, confirmPassword, message, done } = this.state;
        return (
            <FlexCenter>
                <ResetBlock>
                    { !done ?
                        <div>
                            <TextField
                                label="new password"
                                type="password"
                                className="ResetBlock--input"
                                value={password}
                                onChange={e => this.setState({ password: e.target.value })}
                            />
                            <TextField
                                label="confirm password"
                                type="password"
                                className="ResetBlock--input"
                                value={confirmPassword}
                                onChange={e => this.setState({ confirmPassword: e.target.value })}
                            />
                            <div className="ResetBlock--button">
                                <StyledButton
                                    onClick={() => this.requestResetPassword()}
                                >reset password</StyledButton>
                            </div>
                            <p className="ResetBlock--message ResetBlock--message_error">{message}</p>
                        </div>
                    :
                        <div>
                            <p className="ResetBlock--message">Your password has reset. Please login from <Link to='/business/sigin'>here</Link>.</p>
                        </div>
                    }
                </ResetBlock>
            </FlexCenter>
        );
    };
};
export default ResetPage;

const validatePassword = (password, confirmPassword) => {
    if (password === '') {
        return [false, 'password should have at least one character.'];
    }
    if (password !== confirmPassword) {
        return [false, 'miss type'];
    }
    return [true, ''];
};

import styled from 'styled-components';
import { colors, screen } from 'shared/styles/variables';

const ResetBlock = styled.div`
    width: 500px;
    max-width: 100%;
    background-color: ${colors.white};
    border-radius: 5px;
    padding: 24px 32px 24px 32px;
    @media ${screen.mobile} { padding: 16px 8px; }
    
    .ResetBlock--input {
        margin-bottom: 24px;
    }
    .ResetBlock--button {
        margin-bottom: 18px;
        text-align: center;
    }
    .ResetBlock--message {
        text-align: center;
        font-size: 1.4rem;
        &_error {
            color: ${colors.red};
        }
    }
`;