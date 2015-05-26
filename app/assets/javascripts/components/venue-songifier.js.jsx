var React = require('react');
var GoogleMap = require('./google-map');
var NavIcon = require('./navicon');
var VenueItem = require('./venue-item');
var _ = require('lodash');
var VenueMarker = require('./google-marker');
// Mixins
var SidebarBase = require('../mixins/side-bar');

var Landing = React.createClass({
    getDefaultProps: function(){
        return {
            url: 'locations'
        }
    },
    getInitialState: function(){
        this.markerClusterArr = [];
        return {
            latitud: 19.271752,
            longitud: -99.161944,
            zoom: 12,
            venueVisible: true,
            width: "calc(100% - " + 555 +"px)",
            left: 555,
            height: 'calc(100% - ' +  0 + 'px)',
            top: 0,
            venues: [],
            selectedVenue: null
        }
    },
    displayVenueBar: function(){
        var venueIsVisible = this.state.venueVisible;
        this.setState({
            venueVisible: !venueIsVisible
        }, this.getMapDimensions);
    },
    getMapDimensions: function(){
        var state = this.state;
        var width = 0;
        var left = 0;
        var topValue = 0;
        if(state.venueVisible){
           width+= 555; 
           left+= 555;
        }
        this.setState({
            width: "calc(100% - " + width +"px)",
            left: left,
            height: 'calc(100% - ' + topValue + 'px)',
            top: topValue
        },function(){
            var map = this.getMap();
            setTimeout(function(){
                google.maps.event.trigger(map, 'resize');
            }, 500)
        });
    },
    getMap: function () {
        return this.refs.map.mapRef;
    },
    componentDidMount: function(){
        document.body.style.opacity = "1";
        this.latestMarker = null;
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({venues: data},this.setClusterConfig);
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(xhr,status,err);
            }.bind(this)
        });
    },
    shouldComponentUpdate: function(nextProps, nextState){
        var current = this.state;
        if(current.width !== nextState.width || current.venues.length !== nextState.venues.length){
            return true;
        }else{
            return false;
        }
    },
    componentDidUpdate: function(){
        console.log("Did Update");
    },
    setLatestMarker: function(d){
        this.latestMarker = d;
    },
    getLatestMarker: function(){
        return this.latestMarker;
    },
    pushMarker: function(marker){
        this.markerClusterArr.push(marker);
    },
    setClusterConfig: function(){
        var clusterStyles = [
            {
                url: IMAGES['cluster'],
                height: 34,
                width: 34
            }
        ];
        var markers = this.markerClusterArr;
        var map = this.getMap();
        var markerCluster = new MarkerClusterer(map, markers , { styles: clusterStyles });
    },
    render: function(){
        var map,
            venuesSideBar, 
            venuesMarkers,
            clusterMarkers;
        var state = this.state;
        var venues = state.venues
        var cachedLength =  venues.length
        var length = cachedLength;
        var dimensionMap = {
            width: state.width,
            left: state.left,
            height: state.height,
            top:state.top,
            WebkitTransition: 'all 0.5s ease',
            MozTtransition: 'all 0.5s ease',
            transition: 'all 0.5s ease'
        };
        if (length !== 0) {
            map = this.getMap();
            venuesMarkers = new Array(length);
            venuesSideBar = new Array(length);

            while (length--) {
                venue = venues[length];
                venuesMarkers[length] = <VenueMarker key={venue.id} map={map} {...venue} setLatest={this.setLatestMarker} getLatest={this.getLatestMarker} pushMarker={this.pushMarker}/>;
                venuesSideBar[length] = <VenueItem key={venue.id} {...venue} map={map}/>
            }
        }
        return(
            <div style={{height: '100%', width: '100%'}}>
                {venuesMarkers}
                <GoogleMap latitud={Number(this.state.latitud)} longitud={Number(this.state.longitud)}
                zoom={[Number(this.state.zoom), 1, 21]} style={dimensionMap} ref='map'>
                </GoogleMap>
                <VenueBar side={'left'} width={'555'} show={this.state.venueVisible} top={0} display={this.displayVenueBar}>
                    {venuesSideBar}
                </VenueBar>
            </div>
            )
    }
});

var VenueBar = React.createClass({
    mixins: [SidebarBase],
    render: function(){
        var children = this.props.children;
        return(
            <div className="venue-sidebar map-canvas" style={this.baseStyles()}>
                <div className="inner" style={{height:'100%',overflow:'hidden'}}>
                    <img src={IMAGES['sidebar']}  style={{width: "100%", height: "262px"}} />
                    <header style={{padding: '20px 20px 0 20px', height: '38px'}}>
                        <h2 style={{margin: '0'}} >Selecciona el lugar de tu evento</h2>
                    </header>
                    <ul className="results list mCustomScrollbar" data-mcs-theme="dark" data-mcs-scrollinertia="10000"  style={{listStyle: 'none', height:'calc(100% - 300px)',  padding: '20px 0 20px 20px'}}>
                        {children}
                    </ul>
                </div>
                <NavIcon styling={{position: 'absolute',right: '-64px',top: 'calc(50% - 55px)',background: '#2A2A2A',padding: '30px 17px'}} 
                    displaySideBar={this.props.display}
                    opened={this.props.show}/>
            </div>
            )
    }
});

module.exports = Landing;
