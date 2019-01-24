import React from 'react';
import { connect } from 'react-redux';
import Auth from 'shared/components/auth';
import Container from 'shared/components/container';
import Navigation from 'shared/components/navigation';
import BookingsTable from 'shared/components/bookingsTable';
import BookingsTiles from 'shared/components/bookingsTiles';
import BookingsFilter from 'shared/components/bookingsFilter';
import { loadBookings } from 'shared/modules/bookings';
import { today, tomorrow, formatDate } from 'shared/functions/date';


class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.defaultFilter = 'ALL';
        this.setFilterFromHash = this.setFilterFromHash.bind(this);
        this.filterOptions = [
            { label: 'All Upcoming', filter: 'ALL', page: 'dashboard' },
            { label: 'Scheduled Today', filter: 'TODAY', page: 'dashboard' },
            { label: 'Scheduled Tomorrow', filter: 'TOMORROW', page: 'dashboard' },
            { label: 'Completed', filter: 'COMPLETED', page: 'history' },
        ];

        this.state = {
            filter: this.defaultFilter,
            intervalId: setInterval(this.props.loadBookings, 1000 * 60 * 2),
        };
        this.setFilterFromHash();
        this.props.loadBookings();
    }
    componentDidUpdate() {
        this.setFilterFromHash();
    }
     componentWillUnmount () {
        clearInterval(this.state.intervalId);
     }
    setFilterFromHash() {
        const { hash } = window.location;
        const value = hash.slice(1);
        if (this.state.filter !== value) {
            if (value.length !== 0) {
                this.setState({ filter: value });
            } else if (this.state.filter !== this.defaultFilter) {
                this.setState({ filter: this.defaultFilter });
            }
        }
    }
    render() {
        const { bookings, path, locationFilter } = this.props;
        const { filter } = this.state;
        console.log('this is dashboard rendering part------->');
        return (
            <div>
                <Navigation opened={path.toUpperCase()} />
                <Container>
                    <div>
                        <BookingsTiles />
                        <BookingsFilter filterOptions={this.filterOptions} filterValue={filter} />
                        <BookingsTable bookings={getFilteredBookings(bookings, locationFilter, filter)} />
                    </div>
                </Container>
            </div>
        )
    }
}

export default Auth(connect(
    ({ bookings }, ownProps) => ({
        bookings: bookings.upcoming,
        locationFilter: bookings.locationFilter,
        path: ownProps.route.path,
        route: ownProps.route,
    }),
    dispatch => ({
        loadBookings: () => dispatch(loadBookings(dispatch)),
    }),
)(DashboardPage));

const getFilteredBookings = (bookings, locationFilter, filter) => bookings.filter(b => (
    (locationFilter === 'ALL' || b.pickupLocations.some(l => l.address === locationFilter))
    &&
    (
        filter === 'ALL'
        ||
        (filter === 'TODAY' && today === formatDate(b.scheduleDate))
        ||
        (filter === 'TOMORROW' && tomorrow === formatDate(b.scheduleDate))
    )
));
