var React = require('react');
var GoogleMap = require('./google-map');

var Landing = React.createClass({
    getInitialState: function(){
        return {
            latitud: 19.271752,
            longitud: -99.161944,
            zoom: 12
        }
    },
    render: function(){
        return(
            <div style={{height: '100%', width: '100%'}}>
                <GoogleMap latitud={Number(this.state.latitud)} longitud={Number(this.state.longitud)}
                    zoom={[Number(this.state.zoom), 5, 21]}  ref='map'>
                </GoogleMap>
                <div className='inside-map-container'>
                </div>
            </div>
        )
    }
});

module.exports = Landing;
