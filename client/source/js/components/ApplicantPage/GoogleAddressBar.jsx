import React, {Component} from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default class GoogleAddressBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchAddress: this.props.searchAddress,
      error: false,
      loading: false
    };
    this._handleSelect = this._handleSelect.bind(this);
  }

  _handleSelect(searchAddress) {
    this.setState({ searchAddress, loading: true });

    geocodeByAddress(searchAddress)
    .then(results => getLatLng(results[0]))
    .then(({ lat, lng }) => {
      this.setState({ error: false, loading: false });
      this.props.saveNewSearchAddress({ searchAddress, searchLat: lat, searchLng: lng });
    })
    .catch(error => {
      this.setState({ error: true, loading: false });
      this.props.saveNewSearchAddress({ searchAddress: '', searchLat: '', searchLng: '' });
    });
  }

  render() {
    const cssClasses = {
      root: 'form-group',
      input: 'Demo__search-input',
      autocompleteContainer: 'Demo__autocomplete-container',
    };

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className='Demo__suggestion-item'>
        <i className='fa fa-map-marker Demo__suggestion-icon'/>
        <strong className='suggestion-text'>{formattedSuggestion.mainText}</strong>{' '}
        <small className='suggestion-text text-muted'>{formattedSuggestion.secondaryText}</small>
      </div>
    );

    const inputProps = {
      type: 'text',
      value: this.state.searchAddress,
      onChange: searchAddress => this.setState({ searchAddress }),
      // onBlur: () => { console.log('Blur event!'); },
      // onFocus: () => { console.log('Focused!'); },
      autoFocus: false,
      placeholder: 'Search Places',
      name: 'Demo__input',
      id: 'my-input-id',
    };

    const options = {
      location: new google.maps.LatLng(49.2722, -123.1203),
      radius: 40000,
      types: ['geocode']
    };

    return (
      <div className='page-wrapper'>
        <div className='container'>
          <PlacesAutocomplete
            onSelect={this._handleSelect}
            autocompleteItem={AutocompleteItem}
            onEnterKeyDown={this._handleSelect}
            classNames={cssClasses}
            inputProps={inputProps}
            options={options}
          />
          {this.state.loading ? <div><i className='fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner' /></div> : null}
          {!this.state.loading && this.state.error ? <div className='geocoding-results'>Invalid address</div> : null}
        </div>
      </div>
    );
  }
}
