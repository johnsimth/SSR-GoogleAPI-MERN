import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';

import { colors } from 'shared/styles/variables';

export default styled(CircularProgress)`
    && {
      color: ${colors.blue};
    }
`;