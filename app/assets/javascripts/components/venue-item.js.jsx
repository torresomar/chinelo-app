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
                        <figure>{this.props.address}</figure>
                        <div className="price">$4000</div>
                        <div className="info">
                            <div className="type">
                                <i><img src={IMAGES['umbrella']} className="mCS_img_loaded"/>2</i>
                                <span>Apartment</span>
                            </div>
                            <div className="rating" data-rating="4">
                                <span className="stars">
                                    <i className="fa fa-star s1 active" data-score="1"></i>
                                    <i className="fa fa-star s2 active" data-score="2"></i>
                                    <i className="fa fa-star s3 active" data-score="3"></i>
                                    <i className="fa fa-star s4 active" data-score="4"></i>
                                    <i className="fa fa-star s5" data-score="5"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
});

module.exports = VenueItem;
