import React from 'react';
import styled from 'styled-components';
import StyledTextField from 'shared/styles/styledTextField';
import StyledBlock from 'shared/styles/styledBlock';
import TitleIcon from 'shared/components/icons/paper';
import { colors, screen } from 'shared/styles/variables';
import { validateInvoice } from 'shared/components/bookingForm/validations';

const ExtraInfoForm = ({
    handleInputChange,
    invoiceNumber,
    notes,
    displayError,
    invoiceRequired,
}) => (
    <StyledBlock>
        <h3 className="title">
            <TitleIcon color={colors.gray} />
            <span>EXTRA INFO</span>
        </h3>
        <StyledExtraInfo>
            <div className="StyledExtraInfo--invoice">
                <StyledTextField
                    id="invoiceNumber"
                    label="Invoice Number"
                    type="text"
                    onChange={ e => handleInputChange(e.target.value, 'invoiceNumber') }
                    value={invoiceNumber}
                    error={displayError && !validateInvoice(invoiceNumber, invoiceRequired)}
                />
            </div>
            <div className="StyledExtraInfo--notes">
                <StyledTextField
                    id="notes"
                    label="Any additional information?"
                    type="text"
                    onChange={ e => handleInputChange(e.target.value, 'notes') }
                    value={notes}
                />
            </div>
        </StyledExtraInfo>
    </StyledBlock>
);

export default ExtraInfoForm;

const StyledExtraInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
    & > div { margin-bottom: 10px; }
    & > .StyledExtraInfo--invoice {
        width: 200px;
        margin-right: 10px;
        @media ${screen.tablet} {
            width: 100%;
            margin-right: 0;
        }
    }
    & > .StyledExtraInfo--notes {
        flex: 1;
        @media ${screen.tablet} {
            width: 100%;
            flex: auto;
        }
    }
`;