import React from 'react';
import moment from 'moment-timezone';
import styled from 'styled-components';
import StyledTextField from 'shared/styles/styledTextField';
import StyledSelect from 'shared/styles/styledSelect';
import StyledBlock from 'shared/styles/styledBlock';
import { validateDate } from 'shared/components/bookingForm/validations';
import MenuItem from 'shared/styles/styledMenuItem';
import TitleIcon from 'shared/components/icons/watch';
import { colors, screen } from 'shared/styles/variables';
import StyledNotes from 'shared/styles/styledNotes';
import HoverNotes from 'shared/components/hoverNotes';
import { isSameDay } from 'shared/functions/date';
import { formatScheduleTime } from 'shared/functions/format';

export default ({ handleInputChange, date, time, displayError }) => (
    <StyledBlock>
        <h3 className="title">
            <TitleIcon color={colors.gray} />
            <span>WHEN</span>
        </h3>
        <HoverNotes notes={'this is notes. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'} />
        <StyledDataTime>
            <div className="dateTime--dateTime">
                <div className="dateTime--dateTime--date">
                    <StyledTextField
                        id="date"
                        label="Date"
                        type="date"
                        onChange={ e => {
                            const selectedDate = moment(e.target.value).tz('Pacific/Auckland');
                            handleInputChange(selectedDate, 'scheduleDate');
                            if (isSameDay(selectedDate)) {
                                handleInputChange(sameDayDefault(), 'scheduleTime');
                            }
                        }}
                        error={displayError && !validateDate(date)}
                        value={date.format('YYYY-MM-DD')}
                        inputProps={{
                            min: moment().tz("Pacific/Auckland").format('YYYY-MM-DD'),
                        }}
                    />
                </div>
                <StyledSelect
                    width="180px"
                    label="Drop-off Time Window"
                    value={time}
                    id="dropOffTimeWindow"
                    onChange={ e => handleInputChange(e.target.value, 'scheduleTime') }
                >
                    { timeOptions(date).map(time =>
                        time === 'anytime'
                        ? <MenuItem key={time} value={'anytime'}>Anytime</MenuItem>
                        : <MenuItem key={time} value={time}>{formatScheduleTime(time)}</MenuItem>
                    )}
                </StyledSelect>
            </div>
            <div className="dateTime--notes">
                <StyledNotes>
                    <p>Please make sure the pickup is open before the earliest Drop-off Time.</p>
                    {time === 'anytime' && <p className="worn">* Anytime deliveries will be dropped off  between 9am - 6pm.</p>}
                </StyledNotes>
            </div>
        </StyledDataTime>
    </StyledBlock>
);

const StyledDataTime = styled.div`
    display: flex;
    align-items: flex-start;
    @media ${screen.tablet} { display: block; }
    .dateTime--dateTime {
        display: flex;
        align-items: flex-end;
        width: ${180 + 150 + 10}px;
        @media ${screen.tablet} {
            display: block;
            width: 100%;
        }
        & > .dateTime--dateTime--date {
            width: 150px;
            margin-right: 10px;
            @media ${screen.tablet} {
                margin-bottom: 10px;
            }
        }
    }
    .dateTime--notes {
        margin-left: 10px;
        flex: 1;
        @media ${screen.tablet} {
            margin: 10px 0 0 0;
        }
    }
`;

const getAmPm = h => {
    if (h === 12) return '12pm';
    return h > 12 ? `${h - 12}pm` : `${h}am`
};
const sameDayDefault = () => {
    const currentTimeH = Number(moment().tz("Pacific/Auckland").format('h'));
    const bookingTimeMin = currentTimeH + 2;
    const bookingTimeMax = currentTimeH + 2 + 2;
    if (bookingTimeMin > 18) return 'anytime';
    if (bookingTimeMin <= 8) return '8am to 10am';
    return `${getAmPm(bookingTimeMin)} to ${getAmPm(bookingTimeMax)}`;
};

const timeOptions = date => {
    const defaultTimes = ['anytime', '8am to 10am', '9am to 11am', '10am to 12pm', '11am to 1pm', '12pm to 2pm', '1pm to 3pm', '2pm to 4pm', '3pm to 5pm', '4pm to 6pm', '5pm to 7pm', '6pm to 8pm'];

    if (!isSameDay(date)) return defaultTimes;
    const bookingTimeMin = Number(moment().tz("Pacific/Auckland").format('h')) + 2;
    if (bookingTimeMin > 18) return 'not available';
    if (bookingTimeMin <= 8) return defaultTimes;

    return ['anytime', ...defaultTimes.slice(bookingTimeMin - 7)];
}