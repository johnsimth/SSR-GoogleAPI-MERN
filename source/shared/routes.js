import { Router, Route, IndexRedirect, Redirect } from 'react-router';
import App from 'shared/components/app';
import SignInPage from 'shared/pages/signInPage';
import ResetPage from 'shared/pages/resetPage';
import DashboardPage from 'shared/pages/dashboardPage';
import BookingPage from 'shared/pages/bookingPage';
import AccountPage from 'shared/pages/accountPage';
import FAQPage from 'shared/pages/faqPage';
import HistoryPage from 'shared/pages/historyPage';　// TODO: rename

const routeUpdated = () => window.scrollTo(0, 0);

export default (React, browserHistory) => {
  return (
    <Router history={browserHistory} onUpdate={routeUpdated} >
      <Route path="/business" component={App}>
        <IndexRedirect to="dashboard" />
        <Route path="dashboard" component={DashboardPage} />
        <Route path="history" component={HistoryPage} />
        <Route path="account" component={AccountPage} />
        <Route path="faq" component={FAQPage} />
        <Route path="booking/:id" component={BookingPage} />
        <Route path="signin/:token" component={SignInPage} />
        <Route path="signin" component={SignInPage} />
        <Route path="reset/:token" component={ResetPage} />
        <Route path="*" component={DashboardPage} /> { /* or 404 */ }
      </Route>
    </Router>
  )
}
