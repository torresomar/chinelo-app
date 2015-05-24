var React = require('react');

var VenueItem = React.createClass({
    render: function(){
        return(
            <li>
                <div className="item" id="1">
                    <a href="#" className="image loaded">
                        <div className="inner">
                            <img src={IMAGES['metropolitan']} className="mCS_img_loaded" style={{width:'100%',height:'100%'}}/>
                        </div>
                    </a>
                    <div className="wrapper">
                        <a href="#" id="1">
                            <h3>Steak House Restaurant</h3>
                        </a>
                        <figure>63 Birch Street</figure>
                        <div className="price">$2500</div>
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
