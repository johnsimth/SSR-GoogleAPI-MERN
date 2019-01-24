import React from 'react';
import { colors, screen } from 'shared/styles/variables';
import styled from 'styled-components';

export default ({ notes }) => (
  <HoverNotes>
    <p><span>?</span></p>
    <div>
      <p>{notes}</p>
    </div>
  </HoverNotes>
);

const hoverRangePx = 18;
const HoverNotes = styled.div`
  position: absolute;
  display: inline-block;
  left: 56px;
  top: -2px;
  @media ${screen.mobile} { display: none; }
  & > p {
    display: inline-block;
    padding: ${hoverRangePx}px;
    cursor: default;
    user-select: none;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;
    & > span {
      font-weight: normal;
      line-height: 18px;
      width: 20px;
      font-size: 1.2rem;
      text-align: center;
      display: block;
      color: ${colors.gray};
      border: 1px solid ${colors.gray};
      border-radius: 100%;
    }
  }
  & > div {
    position: absolute;
    z-index: 100;
    width: 100vw;
    max-width: ${hoverRangePx * 2 + 440}px;
    padding: ${hoverRangePx}px;
    left: 0;
    top: 26px;
    & > p {
      font-weight: normal;
      font-size: 1.6rem;
      width: 100%;
      padding: 16px;
      line-height: 1.6;
      background-color: ${colors.white};
      box-shadow: 0px 9px 19px 0px rgba(0, 0, 0, 0.14);
      border-radius: 5px;
    }
  }
  & > div { display: none; }
  &:hover > div { display: block; }
`;