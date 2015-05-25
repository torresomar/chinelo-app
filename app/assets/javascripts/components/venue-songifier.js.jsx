var React = require('react');
var GoogleMap = require('./google-map');
var NavIcon = require('./navicon');
var VenueItem = require('./venue-item');
var _ = require('lodash');
var VenueMarker = require('./google-marker');
// Mixins
var SidebarBase = require('../mixins/side-bar');

var Landing = React.createClass({
    getInitialState: function(){
        return {
            latitud: 19.271752,
            longitud: -99.161944,
            zoom: 12,
            venueVisible: true,
            width: "calc(100% - " + 555 +"px)",
            left: 555,
            height: 'calc(100% - ' +  0 + 'px)',
            top: 0,
            venues: []
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
        });
    },
    getMap: function () {
        return this.refs.map.mapRef;
    },
    componentDidMount: function(){
        this.setState({
            venues: [{sample: "hey"},{sample: "dude"},{sample: "here"},{sample: "hey"},{sample: "dude"},{sample: "here"},{sample: "hey"},{sample: "dude"},{sample: "here"}]
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
    render: function(){
        var map,
            venuesSideBar, 
            venuesMarkers;
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
                venuesMarkers[length] = <VenueMarker map={map} latitud={length+19.370520} longitud={-99.176186} text={length}/>;
                venuesSideBar[length] = <VenueItem image={"http://www.lgmstudio.com/files/gimgs/95_20120513auditoriobb0588.jpg"} name={"Auditorio Blackberry"}
                            address={"Calle Tlaxcala 160, Cuauhtemoc, Hipódromo Condesa, 06170 Ciudad de México, D.F."}
                            price={590}/>
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
                    <ul className="results list mCustomScrollbar" data-mcs-theme="dark" style={{listStyle: 'none', height:'calc(100% - 0px)'}}>
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
