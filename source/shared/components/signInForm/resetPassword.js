import React from 'react';
import Ajax from 'client/ajax';
import { StyledButtonGreen } from 'shared/styles/styledButton';
import TextField from 'shared/styles/styledTextField';

class ResetPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            email: '',
            sent: false,
        };
        this.resetPassword = this.resetPassword.bind(this);
    }
    resetPassword() {
        Ajax.post('/api/business/reset', { email: this.state.email }, null);
        this.setState({
            sent: true,
            email: '',
            open: false,
        });
    }
    render() {
        const { open, email, sent } = this.state;
        return (
            <StyledResetPassword>
                {!open && !sent &&
                    <button
                        className="ResetPassword--open"
                        onClick={() => this.setState({ open: true })}
                    >Forgot your password? </button>
                }
                { open &&
                    <div>
                        <p className="ResetPassword--message">Submit your email and we’ll send you a email to reset your password. </p>
                        <div className="ResetPassword--input">
                            <TextField
                                label="Email"
                                type="text"
                                value={email}
                                onChange={e => this.setState({ email: e.target.value })}
                            />
                        </div>
                        <div className="ResetPassword--submit">
                            <StyledButtonGreen
                                onClick={() => this.resetPassword()}
                            >Submit</StyledButtonGreen>
                        </div>
                    </div>
                }
                { sent && <p className="ResetPassword--message">You will receive a Email from us shortly.</p>}
            </StyledResetPassword>
        )
    }
}

export default ResetPassword;


import styled from 'styled-components';
import { colors } from 'shared/styles/variables';
const StyledResetPassword = styled.div`
    margin-top: 2rem;
    .ResetPassword--open {
        border: none;
        background: none;
        text-decoration: underline;
        color: ${colors.blue};
        cursor: pointer;
        padding: 0;
        text-align: center;
        display: block;
        margin: 0 auto;
        &:hover { opacity: 0.8; }
    }
    .ResetPassword--message {
        font-size: 1.4rem;
        margin-bottom: 1rem;
    }
    .ResetPassword--submit {
        text-align: center;
    }
    .ResetPassword--input {
        margin-bottom: 1rem;
    }
`;