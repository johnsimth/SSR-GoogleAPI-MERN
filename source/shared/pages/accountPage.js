import React from 'react';
import { connect } from 'react-redux';

import Auth from 'shared/components/auth';
import Container from 'shared/components/container';
import Navigation from 'shared/components/navigation';
import AccountProfile from 'shared/components/accountProfile';
import AccountAddress from 'shared/components/accountAddress';
import { addLocation, deleteLocation } from 'shared/modules/settings';

const AccountPage = ({ userInfo, locations, addLocation, deleteLocation }) => (
    <div>
        <Navigation opened="ACCOUNT" />
        <Container>
          <AccountProfile user={userInfo} />
          <AccountAddress locations={locations} addLocation={addLocation} deleteLocation={deleteLocation} />
        </Container>
    </div>
);
export default Auth(connect(
    ({ user, settings }) => ({
        userInfo: user.user,
        locations: settings.locations,
    }),
    dispatch => ({
        addLocation: location => dispatch(addLocation(location)),
        deleteLocation: id => dispatch(deleteLocation(id)),
    }),
)(AccountPage));