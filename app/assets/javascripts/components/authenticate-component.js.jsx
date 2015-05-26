var React = require('react');

var AuthenticateComponent = React.createClass({
    componentDidMount: function(){
        document.body.style.opacity = "1";
    },
    render: function(){
        return(
            <div style={{height: '100%', width: '100%',background: '#020202'}}>
                <img src={IMAGES['manaauth']} style={{position: 'absolute',
                    top: 'calc(50% - 480px)',
                    left: 'calc(50% - 480px)'
                }} />
            <a href="auth/spotify" className='btn btn-login' style={{width:'350px', height: '50px', color: '#fff',
                position: 'absolute', bottom: '200px', left:'calc(50% - 175px)',
                background: '#2ebd59', borderRadius: '50px', lineHeight: '35px'}}>
                LOG IN USING YOUR SPOTIFY ACCOUNT
            </a>
            </div>
        )
    }
});

module.exports = AuthenticateComponent;
