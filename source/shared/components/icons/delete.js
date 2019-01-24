import React from 'react';
export default ({ color }) => (
    <svg x="0px" y="0px" viewBox="0 0 30 30">
        <circle fill={color} cx="15" cy="15" r="15" transform="translate(-0.81 0.85) rotate(-3.17)"/>
        <path fill="white" d="M9.65,10.35l.7-.7,10,10-.7.7Z"/>
        <path fill="white" d="M10.35,20.35l-.7-.7,10-10,.7.7Z"/>
    </svg>
);