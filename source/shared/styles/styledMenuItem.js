import styled from 'styled-components';
import { MenuItem } from '@material-ui/core';
import { colors, input } from 'shared/styles/variables';

export default styled(MenuItem)`
    && {
        font-size: ${input.inputFontSize}rem;
        color: ${colors.black};
    }
`;