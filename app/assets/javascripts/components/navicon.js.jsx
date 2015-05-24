var React = require('react');

var NavIcon = React.createClass({
    render: function(){
        var classed = this.props.opened ? "open":"";
        return(
            <div style={this.props.styling} className={"navicon-button x " + classed} onClick={this.props.displaySideBar}>
                <div className="navicon"></div>
            </div>
            )
    }
});

module.exports = NavIcon;
