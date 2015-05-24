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
            venueVisible: true
        }
    },
    displayVenueBar: function(){
        console.log("hey");
        var venueIsVisible = this.state.venueVisible;
        this.setState({
            venueVisible: !venueIsVisible
        });
    },
    render: function(){
        return(
            <div style={{height: '100%', width: '100%'}}>
                <GoogleMap latitud={Number(this.state.latitud)} longitud={Number(this.state.longitud)}
                zoom={[Number(this.state.zoom), 5, 21]}  ref='map'>
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
                    background: '#fff',
                    padding: '30px 17px'
                }} displaySideBar={this.props.display} opened={this.props.show}/>
            </div>
            )
    }
});

module.exports = Landing;
