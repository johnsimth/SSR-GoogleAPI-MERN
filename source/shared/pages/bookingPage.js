'use strict'

import React from 'react'
import Auth from 'shared/components/auth'
import Container from 'shared/components/container'
import Navigation from 'shared/components/navigation'
import BookingForm from 'shared/components/bookingForm'
import BookingView from 'shared/components/bookingView'

const BookingPage = ({ params }) => {
    const { id } = params;
    return (
        <div>
            <Navigation opened={isNaN(id) && 'NEW_BOOKING'} />
            <Container>
                { isNaN(id) && <BookingForm /> }
                { !isNaN(id) && <BookingView id={id} /> }
            </Container>
        </div>
    )
};

export default Auth(BookingPage);
