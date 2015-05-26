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
        map.setZoom(16);
    },
    setUserLocation: function(){
        var props = this.props;
        $.ajax({
            url: 'place',
            type: 'POST',
            dataType: 'json',
            cache: false,
            data: { location: props.id } ,
            success: function(data) {
                document.body.style.opacity = "0.5";
                window.location.href = 'playlist';
            }.bind(this),
            error: function(xhr, status, err) {
                console.log("Error");
                console.log(xhr,status,err);
            }.bind(this)
        });
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
                        <a onClick={this.setUserLocation} className="price" style={{width:'100%'}}>SET MY LOCATION</a>
                    </div>
                </div>
            </li>
        )
    }
});

module.exports = VenueItem;
