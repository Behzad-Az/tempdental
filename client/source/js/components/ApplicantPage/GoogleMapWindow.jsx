import _ from 'lodash';

import {
  default as React,
  Component,
  PropTypes,
} from 'react';

import FaSpinner from 'react-icons/lib/fa/spinner';

import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs
} from 'react-google-maps';

/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Loaded using async loader.
 */
const AsyncGettingStartedExampleGoogleMap = _.flowRight(
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={10}
    defaultCenter={{ lat: props.centerCoord.lat, lng: props.centerCoord.lng }}
    onClick={props.onMapClick}
    defaultOptions={{
      streetViewControl: false,
      mapTypeControl: false,
      scaleControl: false,
      rotateControl: false,
      fullscreenControl: false
    }}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}
  </GoogleMap>
));

export default class AsyncGettingStartedExample extends Component {

  static propTypes = {
    // toast: PropTypes.func.isRequired,
    lat: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      markers: [{
        position: {
          lat: this.props.lat,
          lng: this.props.lng,
        },
        key: `Taiwan`,
        // defaultAnimation: 2,
      }],
    };
    this._handleMapLoad = this._handleMapLoad.bind(this);
    this._handleMapClick = this._handleMapClick.bind(this);
    this._handleMarkerRightClick = this._handleMarkerRightClick.bind(this);
  }

  _handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      // console.log(map.getZoom());
    }
  }

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  _handleMapClick(event) {
    // const nextMarkers = [
    //   ...this.state.markers,
    //   {
    //     position: event.latLng,
    //     // defaultAnimation: 2,
    //     key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
    //   },
    // ];
    // this.setState({
    //   markers: nextMarkers,
    // });

    // if (nextMarkers.length === 3) {
    //   // this.props.toast(
    //   //   `Right click on the marker to remove it`,
    //   //   `Also check the code!`
    //   // );
    // }
  }

  _handleMarkerRightClick(targetMarker) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    // const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    // this.setState({
    //   markers: nextMarkers,
    // });
  }

  render() {
    return (
      <AsyncGettingStartedExampleGoogleMap
        googleMapURL='https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyARFg0emYfEeWLKRT2q2csKpEYxIJH1YAE'
        loadingElement={
          <div style={{ width: '100%', height: '100%' }}>
            <FaSpinner
              style={{
                display: `block`,
                width: `20px`,
                height: `20px`,
                margin: `150px auto`,
                animation: `fa-spin 2s infinite linear`,
              }}
            />
          </div>
        }
        centerCoord={this.state.markers[0].position}
        containerElement={
          <div style={{ width: '100%', height: '100%' }} />
        }
        mapElement={
          <div style={{ width: '150px', height: '150px' }} />
        }
        onMapLoad={this._handleMapLoad}
        onMapClick={this._handleMapClick}
        markers={this.state.markers}
        onMarkerRightClick={this._handleMarkerRightClick}

      />
    );
  }
}
