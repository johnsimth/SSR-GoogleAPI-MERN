import React from 'react'
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import StyledProgress from 'shared/styles/styledProgress';
import FlexCenter from 'shared/styles/flexCenter';

export default SecuredComponent => {
    class Authenticated extends React.Component {
        componentDidMount() {
            redirectToSignIn(this.props);
        }
        componentDidUpdate() {
            redirectToSignIn(this.props);
        }
        render() {
            const { loading, status } = this.props;
            console.log(loading, status);
            if (status !== 'authenticated' || loading) {
                return <FlexCenter><StyledProgress size={24} /></FlexCenter>
            }
            return <SecuredComponent {...this.props} />
        }
    }
    return connect(
        ({ user }) => ({
            loading: user.loading,
            status: user.status,
        }),
        null,
    )(Authenticated);
}

const redirectToSignIn = thisProps => {
    const { loading, status } = thisProps;
    if (status !== 'authenticated' && !loading) {
        browserHistory.push('/business/signin');
    }
}