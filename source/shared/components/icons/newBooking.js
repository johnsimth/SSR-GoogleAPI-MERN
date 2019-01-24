import React from 'react';
const NewBooking = ({ color }) => (
    <svg x="0px" y="0px" viewBox="0 0 20 20">
        <path fill={color} d="M14.5,9.5h-4v-4a.5.5,0,0,0-1,0v4h-4a.5.5,0,0,0,0,1h4v4a.5.5,0,0,0,1,0v-4h4a.5.5,0,0,0,0-1Z"/><path fill={color} d="M10,.5A9.5,9.5,0,1,0,19.5,10,9.51,9.51,0,0,0,10,.5Zm0,18A8.5,8.5,0,1,1,18.5,10,8.51,8.51,0,0,1,10,18.5Z"/>
    </svg>
);

export default NewBooking;
