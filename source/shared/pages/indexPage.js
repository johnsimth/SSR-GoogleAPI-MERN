import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Container from 'shared/components/container';
import { logoutUser }  from 'shared/modules/user';

const IndexPage = ({ authenticatedUser, logout }) => (
    <Container>
        { !authenticatedUser && <Link to="/business/signin">Sign In</Link> }
        { authenticatedUser &&
            <ul>
                <li><Link to="/business/bookings/true">My Bookings</Link></li>
                <li><Link to="/business/booking/new">+ Create New Booking</Link></li>
                <li><button onClick={logout}>logout</button></li>
            </ul>
        }
    </Container>
);

export default connect(
  ({ user }) => ({
    authenticatedUser: user.status === 'authenticated' ? user.user : null
  }),
  dispatch => ({
    logout: () => dispatch(logoutUser()),
  }),
)(IndexPage);
