import React from 'react';
import Autosuggest from 'react-autosuggest';
import { Paper, Popper } from '@material-ui/core';

import MenuItem from 'shared/styles/styledMenuItem';
import StyledTextTextField from 'shared/styles/styledTextField';
import googleMapAutocomplete from 'shared/components/locationSearch/googleMapAutocomplete';

class LocationSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = { suggestions: [], value: this.props.value };
        this.popperNode = null;
        this.handleChange = this.handleChange.bind(this);
        this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind(this);
        this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(this);
    }
    handleChange(e , { newValue }) {
        this.props.handleInputChange(newValue);
    }
    handleSuggestionsFetchRequested({ value }) {
        googleMapAutocomplete(value).then(results => {
            this.setState({ suggestions: results.map(v => ({ label: v })) });
        });
    }
    handleSuggestionsClearRequested() {
        this.setState({ suggestions: [] });
    }
    render() {
        const { suggestions } = this.state;
        const { value, inputLabel, error } = this.props;
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                getSuggestionValue={suggestions => suggestions.label}
                inputProps={{
                    value,
                    onChange: this.handleChange,
                    inputRef: node => { this.popperNode = node },
                }}
                renderSuggestion={suggestion => (
                    <MenuItem component="div">
                        {suggestion.label}
                    </MenuItem>
                )}
                renderInputComponent={inputProps => {
                    const { inputRef = () => {}, ref, ...other } = inputProps;
                    return (
                        <StyledTextTextField
                            InputProps={{
                                inputRef: node => {
                                    ref(node);
                                    inputRef(node);
                                }
                            }}
                            error={error}
                            label={inputLabel}
                            placeholder="Search location"
                            {...other}
                        />
                    );
                }}
                renderSuggestionsContainer={options => (
                    <Popper anchorEl={this.popperNode} open={Boolean(options.children)}>
                        <Paper
                            square
                            {...options.containerProps}
                            style={{ width: this.popperNode ? this.popperNode.clientWidth : null }}
                        >
                        {options.children}
                        </Paper>
                    </Popper>
                )}
            />
        );
    }
};

export default LocationSearch;