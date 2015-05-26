var React = require('react');

var VenueItem = React.createClass({
    getDefaultProps: function(){
        return {
            image: "",
            name: "",
            price: "",
            lat: 1,
            lng: 1,
            address: ""
        }
    },
    panToMarker: function(){
        var props = this.props;
        var latLng = new google.maps.LatLng(props.latitude, props.longitude); //Makes a latlng
        var map = this.props.map;
        map.panTo(latLng); //Make map global
    },
    render: function(){
        return(
            <li className="venue-list-item">
                <div className="item" id="1">
                    <a href="#" onClick={this.panToMarker} className="image loaded">
                        <div className="inner">
                            <img src={this.props.imageurl} className="mCS_img_loaded" style={{width:'100%',height:'100%'}}/>
                        </div>
                    </a>
                    <div className="wrapper">
                        <a href="#" id="1">
                            <h3>{this.props.building}</h3>
                        </a>
                        <figure style={{height:'75px'}}>{this.props.address}</figure>
                        <div onClick={this.props.setAsLocation} className="price" style={{width:'100%'}}>SET MY LOCATION</div>
                    </div>
                </div>
            </li>
        )
    }
});

module.exports = VenueItem;
