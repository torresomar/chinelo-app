var React = require('react');
var _ = require('lodash');
var MapUtils = require('../utilities/map-utils');

var GoogleMap = React.createClass({
    getDefaultProps: function() {
        var top_value = 0;
        var navbarHeight = 0;
        return {
            style: {
                width: 'calc(100% - 555px)',
                left: '555px',
                height: 'calc(100% - ' + top_value + 'px)', 
                top: navbarHeight,
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
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.BOTTOM_CENTER
                }
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
        google.maps.event.addListener(this.mapRef, 'idle', function() {
        });

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
        function locationChange() {
            var center = this.mapRef.getCenter();
            var zoom = this.mapRef.getZoom();
            props.onLocationChange({
                zoom: zoom,
                latitud: center.lat(),
                longitud: center.lng()
            });
        }
    },
    shouldComponentUpdate: function(next_props, next_state) {
        return this.props.style.width !== next_props.style.width;
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
