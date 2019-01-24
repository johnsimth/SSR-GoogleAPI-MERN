import React from 'react';
import { connect } from 'react-redux';
import Auth from 'shared/components/auth';
import Container from 'shared/components/container';
import Navigation from 'shared/components/navigation';
import BookingsTable from 'shared/components/bookingsTable';
import BookingsTiles from 'shared/components/bookingsTiles';
import BookingsFilter from 'shared/components/bookingsFilter';
import { loadHistory } from 'shared/modules/bookings';
import Notes from 'shared/styles/styledNotes';

class HistoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.defaultFilter = 'COMPLETED';
        this.filterOptions = [
            { label: 'Upcoming', filter: 'ALL', page: 'dashboard' },
            { label: 'Completed', filter: 'COMPLETED', page: 'history' },
        ];
        this.setFilterFromHash = this.setFilterFromHash.bind(this);

        this.state = {
            filter: this.defaultFilter,
            intervalId: setInterval(this.props.loadHistory, 1000 * 60 * 2),
        };
        this.setFilterFromHash();
        this.props.loadHistory();
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
        return (
            <div>
                <Navigation opened={path.toUpperCase()} />
                <Container>
                    <div>
                        <BookingsTiles />
                        <BookingsFilter
                            filterOptions={this.filterOptions}
                            filterValue={filter}
                            changeFilter={this.changeFilter}
                        />
                        <BookingsTable bookings={getFilteredBookings(bookings, locationFilter, filter)} />
                    </div>
                    <Notes><p>For history older than this please contact Transfervans and we will provide you a report.</p></Notes>
                </Container>
            </div>
        )
    }
}

export default Auth(connect(
    ({ bookings }, ownProps) => ({
        bookings: bookings.history,
        locationFilter: bookings.locationFilter,
        path: ownProps.route.path,
    }),
    dispatch => ({
        loadHistory: () => dispatch(loadHistory(dispatch)),
    }),
)(HistoryPage));

const getFilteredBookings = (bookings, locationFilter, filter) => bookings.filter(b => (
    (locationFilter === 'ALL' || b.pickupLocations.some(l => l.address === locationFilter))
    &&
    filter === 'COMPLETED'
));