var React = require('react');
var GoogleMap = require('./google-map');
var NavIcon = require('./navicon');
// Mixins
var SidebarBase = require('../mixins/side-bar');

var Landing = React.createClass({
    getInitialState: function(){
        return {
            latitud: 19.271752,
            longitud: -99.161944,
            zoom: 12,
            venueVisible: true,
            width: "calc(100% - " + 250 +"px)",
            left: 250,
            height: 'calc(100% - ' +  0 + 'px)',
            top: 0
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
           width+= 250; 
           left+= 250;
        }
        this.setState({
            width: "calc(100% - " + width +"px)",
            left: left,
            height: 'calc(100% - ' + topValue + 'px)',
            top: topValue
        });
    },
    render: function(){
        var state = this.state;
        var dimensionMap = {
            width: state.width,
            left: state.left,
            height: state.height,
            top:state.top,
            WebkitTransition: 'all 0.5s ease',
            MozTtransition: 'all 0.5s ease',
            transition: 'all 0.5s ease'
        };
        return(
            <div style={{height: '100%', width: '100%'}}>
                <GoogleMap latitud={Number(this.state.latitud)} longitud={Number(this.state.longitud)}
                zoom={[Number(this.state.zoom), 5, 21]} style={dimensionMap} ref='map'>
                </GoogleMap>
                <VenueBar side={'left'} width={'250'} show={this.state.venueVisible} top={0} display={this.displayVenueBar}/>
            </div>
            )
    }
});

var VenueBar = React.createClass({
    mixins: [SidebarBase],
    render: function(){
        return(
            <div className="venue-sidebar" style={this.baseStyles()}>
                <NavIcon styling={{
                    position: 'absolute',
                    right: '-64px',
                    top: 'calc(50% - 55px)',
                    background: '#2A2A2A',
                    padding: '30px 17px'
                }} displaySideBar={this.props.display} opened={this.props.show}/>
            </div>
            )
    }
});

module.exports = Landing;
