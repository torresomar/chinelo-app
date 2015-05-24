var React = require('react');
var _ = require('lodash');
var MapUtils = require('../utilities/map-utils');

var GoogleMap = React.createClass({
    getDefaultProps: function() {
        var top_value = 0;
        var navbarHeight = 0;
        return {
            style: {
                width: 'calc(100% - 200px)',
                left: '200px',
                height: 'calc(100% - ' + top_value + 'px)', 
                top: navbarHeight
            }
        };
    },
    getZoomObject: function() {
        var zoom = this.props.zoom;
        if (!_.isArray(zoom)) {
            return {
                zoom: zoom
            };
        } else if (zoom.length < 3) {
            return {
                zoom: zoom[0],
                maxZoom: zoom[1]
            };
        } else {
            return {
                zoom: zoom[0],
                minZoom: zoom[1],
                maxZoom: zoom[2]
            };
        }
    },
    componentDidMount: function() {
        var props = this.props,
            lat = props.latitud,
            lon = props.longitud,
            zoom = props.zoom,
            addListener,
            mapOptions = {
                center: new google.maps.LatLng(lat, lon),
                styles: MapUtils.styles,
                disableDefaultUI: true
            },
            zoomDiv = document.createElement('div'),
            zoomControls = null;

        _.extend(mapOptions, this.getZoomObject());

        // Create map reference
        this.mapRef = new google.maps.Map(React.findDOMNode(this), mapOptions);
        addListener = _.partial(google.maps.event.addListener, this.mapRef);

        // Setup custom zoom controls
        if (_.isUndefined(props.zoomTop) || _.isUndefined(props.zoomRight)) {
            props.zoomTop = 0;
            props.zoomRight = 0;
        }

        // zoomControls = new MapUtils.ZoomControl(zoomDiv, this.mapRef, props.zoomLeft, props.zoomTop, props.zoomRight);
        // zoomDiv.index = 1;

        // Add event listener
        if (_.isFunction(props.onLocationChange)) {
            addListener('idle', function() {
                var center = this.mapRef.getCenter(),
                    zoom = this.mapRef.getZoom();
                props.onLocationChange({
                    zoom: zoom,
                    latitud: center.lat(),
                    longitud: center.lng()
                });
            }.bind(this));
        }
        var _this = this;

        this.mapRef.controls[google.maps.ControlPosition.RIGHT_TOP].push(zoomDiv);

        // Add event listeners
        function locationChange() {
            var center = this.mapRef.getCenter(),
                zoom = this.mapRef.getZoom();
            props.onLocationChange({
                zoom: zoom,
                latitud: center.lat(),
                longitud: center.lng()
            });
        }
    },
    shouldComponentUpdate: function(next_props, next_state) {
        var abs = Math.abs,
            lat1 = Number(this.props.latitud),
            lng1 = Number(this.props.longitud),
            lat2 = Number(next_props.latitud),
            lng2 = Number(next_props.longitud),
            same_position = (abs(lat2 - lat1) / lat1 <= 0.0001) && (abs(lng2 - lng1) / lng1 <= 0.0001);
        if (this.props.style === undefined) {
            return !same_position;
        } else {
            return this.props.style.width !== next_props.style.width || !same_position;
        }
    },
    componentDidUpdate: function() {
        this.mapRef.setZoom(this.getZoomObject().zoom);
        this.mapRef.panTo(new google.maps.LatLng(this.props.latitud, this.props.longitud));
    },
    redraw: function() {
        google.maps.event.trigger(this.mapRef, 'resize');
        this.mapRef.setCenter(new google.maps.LatLng(this.props.latitud, this.props.longitud));
    },
    render: function() {
        console.log(this.props);
        return <div style={this.props.style}></div>;
    }
});

module.exports = GoogleMap;
