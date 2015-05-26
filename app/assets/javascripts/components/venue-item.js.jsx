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
    render: function(){
        return(
            <li className="venue-list-item">
                <div className="item" id="1">
                    <a href="#" className="image loaded">
                        <div className="inner">
                            <img src={this.props.imageurl} className="mCS_img_loaded" style={{width:'100%',height:'100%'}}/>
                        </div>
                    </a>
                    <div className="wrapper">
                        <a href="#" id="1">
                            <h3>{this.props.building}</h3>
                        </a>
                        <figure style={{height:'75px'}}>{this.props.address}</figure>
                        <div className="price" style={{width:'100%'}}>SET MY LOCATION</div>
                    </div>
                </div>
            </li>
        )
    }
});

module.exports = VenueItem;
