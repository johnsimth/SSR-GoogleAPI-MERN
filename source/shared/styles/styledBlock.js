import styled from 'styled-components';
import { colors, screen } from 'shared/styles/variables';

export default styled.div`
    border-radius: 5px;
    background-color: ${colors.white};
    padding: 24px 32px 24px 110px;
    @media ${screen.mobile} { padding: 16px 8px; }
    position: relative;
    margin-bottom: 24px;
    & > .title {
        position: absolute;
        left: 0;
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        flex-direction: column;
        width: 110px;
        span {
            color: ${colors.gray};
            display: block;
            font-size: 1.1rem;
        }
        svg {
            width: 28px;
            display: block;
            margin-bottom: 8px;
        }
        @media ${screen.mobile} {
            position: relative;
            flex-direction: row;
            margin-bottom: 18px;
            width: 100%;
            span {
                font-size: 1.4rem;
                padding-right: 60px;
            }
            svg {
                margin-right: 6px;
                margin-bottom: 0;
            }
        }
    }
`;
