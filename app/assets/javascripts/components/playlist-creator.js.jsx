var React = require('react');

var PlayListCreator = React.createClass({
    componentDidMount: function(){
        document.body.style.opacity = "1";
    },
    render: function(){
        return(
            <h1>Sample configuratrion</h1>
            )
    }
});

module.exports = PlayListCreator;
