import styled from 'styled-components';
import { colors } from 'shared/styles/variables';

export default styled.div`
  background-color: ${colors.yellow};
  padding: 10px 18px;
  border-radius: 4px;
  margin: 0;
  & > p {
    line-height: 1.4;
    margin: 8px 0;
    font-size: 1.2rem;
  }
  & > .worn {
    color: ${colors.gray};
    font-style: italic;
    font-size: 1.2rem;
  }
`;