import React from 'react';

import StyledTextField from 'shared/styles/styledTextField';
import StyledBlock from 'shared/styles/styledBlock';
import StyledProgress from 'shared/styles/styledProgress';
import { StyledButtonInBlock, DeleteButton } from 'shared/styles/styledButton';
import Ajax from 'client/ajax'
import LocationSearch from 'shared/components/locationSearch';
import LocationIcon from 'shared/components/icons/location';

class AccountAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            address: '',
            name: '',
            loading: false,
            error: false,
        }
        this.toggleAdd = this.toggleAdd.bind(this);
        this.addLocation = this.addLocation.bind(this);
    }
    toggleAdd() {
        this.setState({ open: !this.state.open });
    }
    deleteLocation(id) {
        let token = typeof(localStorage) !== 'undefined' ? localStorage.getItem('jwtTokenBusiness') : null

        Ajax.delete(`/api/business/location/${id}`, token)
            .then(response => {
                this.setState({ loading: false })
                const data = JSON.parse(response.data);
                this.props.deleteLocation(data.id);
            })
            .catch(reason => {
                this.setState({ loading: false, error: true });
            })
        this.setState({ loading: true });
    }
    addLocation() {
        let token = null;
        if (typeof(localStorage) !== 'undefined') token = localStorage.getItem('jwtTokenBusiness');
        const details = {
            address: this.state.address,
            name: this.state.name,
            elevator: false, floors: 0, accessDistance: 0,
        };
        Ajax.post('/api/business/addlocation', details, token)
            .then(response => {
                const data = JSON.parse(response.data);
                this.props.addLocation(data.location);
                this.setState({ loading: false, address: '', name: '', open: false });
            })
            .catch(reasons => {
                console.log(reasons);
                this.setState({ loading: false, error: true });
            })
        this.setState({ loading: true });
    }
    render() {
        const { locations } = this.props;
        const { open, address, name, loading } = this.state;
        return (
            <StyledBlock>
                <h3 className="title">
                    <LocationIcon color={colors.gray} />
                    <span>Address</span>
                </h3>
                { locations.map(location => {
                    const storeName = location.storeName === null ? '' : location.storeName;
                    return (
                        <StyledAddress key={`locations_${location.id}`}>
                            <div className="StyledAddress--name">
                                <StyledTextField value={storeName} label="Store Name" InputProps={{ disabled: true }} />
                            </div>
                            <div className="StyledAddress--address">
                                <StyledTextField value={location.address} label="Address" InputProps={{ disabled: true }} />
                            </div>
                            <div className="StyledAddress--action">
                                { locations.length !== 1 && 
                                    <DeleteButton onClick={e => this.deleteLocation(location.id)} />
                                }
                            </div>
                        </StyledAddress>
                    )
                })}
                {!open && (
                    <AddAddressButton>
                        <StyledButtonInBlock onClick={e => this.toggleAdd()}>Add new address</StyledButtonInBlock>
                    </AddAddressButton>
                )}
                
                {open &&
                    <div>
                        <StyledAddress>
                            <div className="StyledAddress--name">
                                <StyledTextField
                                    label="Store Name"
                                    placeholder="enter the name"
                                    type="text"
                                    onChange={e => this.setState({ name: e.target.value })}
                                    value={name}
                                />
                            </div>
                            <div className="StyledAddress--address">
                                <LocationSearch
                                    inputLabel="Address"
                                    value={address}
                                    handleInputChange={v => this.setState({ address: v })}
                                />
                            </div>
                        </StyledAddress>
                        { !loading && address !== '' && name !== '' &&
                            <StyledButtonInBlock
                                onClick={e => this.addLocation()}
                            >Save</StyledButtonInBlock>
                        }
                        { loading && <StyledProgress size={24} /> }
                    </div>
                }
            </StyledBlock>
        );
    }
}

export default AccountAddress;


import styled from 'styled-components';
import { colors, screen } from 'shared/styles/variables';
const StyledAddress = styled.div`
    display: flex;
    flex-wrap: wrap;
    position: relative;
    width: 100%;
    padding-right: 50px;
    @media ${screen.mobile} { padding-right: 0; }
    & > div { margin-bottom: 10px; }
    & > .StyledAddress--name {
        width: 240px;
        @media ${screen.tablet} { width: 100%; }
    }
    & > .StyledAddress--address {
        flex: 1;
        @media ${screen.tablet} {
            width: 100%;
            flex: auto;
            padding-bottom: 24px;
        }
    }
    & > .StyledAddress--action {
        position: absolute;
        right: 40px;
        top: 36px;
        @media ${screen.mobile} { display: none; }
    }
`;
const AddAddressButton = styled.div`
    @media ${screen.mobile} { display: none; }
    text-align: center;
    margin: 10px 50px 0 0;
`;