var React = require('react');

var PlayListCreator = React.createClass({
    componentDidMount: function(){
        document.body.style.opacity = "1";
    },
    render: function(){
        return(
            <div style={{height: '100%', width: '100%', background: '#222'}}>
                <VenueTopBar/>
                <InteractionContainer url={'songs'}/>
            </div>
            )
    }
});

var VenueTopBar = React.createClass({
    render: function(){
        return(
            <div style={{height:'59px',width:'100%', position: 'relative', background: '#222',zIndex: '2'}}>
                <h1 style={{background:'#ff513f', color: '#fff', padding: '20px', display: 'inline-block', width:'75%'}}>
                    Palacio de los Deportes
                    <small style={{color:'#E0E0E0'}}> Avenida Del Conscripto 311 Miguel Hidalgo Lomas de Sotelo 11200 Ciudad de México, D.F </small>
                </h1>
                <h1 style={{background:'#FF3C27', color: '#fff', padding: '20px', display: 'inline-block', width:'25%'}}>
                    <a href="/" style={{color:'#fff'}}> Change Location</a>
                </h1>
                <div style={{position:'absolute',width: '100px', height: '40px', background: '#fff', bottom: '-40px', left: '10px'}}>
                    <h3 style={{textAlign:'center', margin:'0',lineHeight:'40px'}}> JUN 15 </h3>
                </div>
                <div style={{position:'absolute',width: '100px', height: '40px', background: '#fff', bottom: '-40px', left: '120px'}}>
                    <h3 style={{textAlign:'center', margin:'0',lineHeight:'40px'}}> JUN 16 </h3>
                </div>
                <div style={{position:'absolute',width: '100px', height: '40px', background: '#fff', bottom: '-40px', left: '230px'}}>
                    <h3 style={{textAlign:'center', margin:'0',lineHeight:'40px'}}> JUN 18 </h3>
                </div>
            </div>
            )
    }
});

var InteractionContainer = React.createClass({
    getInitialState: function(){
        return{
            currentSong: null,
            playListSongs: [],
            artistSongs: []
        }
    },
    handleDrop: function(e) {
        e.target.style.borderWidth = "1px";
        e.stopPropagation();
        var products = this.props.products,
        item = null,
        itemId = e.dataTransfer.getData('text/plain');
        for (var i = 0; i < products.length; i++) {
            if (products[i].id == itemId) {
                item = products[i];
            }
        }
        this.addItemToCart(item);
    },
    handleDragStart: function(e) {
        var target = e.target;
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('text/plain', target.dataset.item);
    },
    componentDidMount:function(){
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({
                    artistSongs: data
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(xhr,status,err);
            }.bind(this)
        });
    },
    render: function(){
        return(
            <div style={{width: '100%', height:'calc(100% - 59px)'}}>
                <VenueArtistDisplay/>
                <ArtistPlaylist songs={this.state.artistSongs} />
                <UserPlayList handleDrop={this.handleDrop}/>
            </div>
            )
    }
});
var UserPlayList = React.createClass({
    render: function(){
        return(
            <div style={{width: '25%',height: '100%', float: 'left', background: '#2F2F2F'}}>
            </div>
            )
    }
});
var VenueArtistDisplay = React.createClass({
    render: function(){
        return(
            <div style={{width: '50%',height: '100%', float: 'left', position: 'relative'}}>
                <img src="https://scontent-lax1-1.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/11017670_10155291356625188_1245432389474863937_n.jpg?oh=a0ee4be0f9479c5d7f36205a27750061&oe=55C0B629" style={{width:'100%', height:'100%', position: 'absolute', top: '0', left: '0'}}/>
                <img src="http://ecx.images-amazon.com/images/I/91k0SfKvlLL._SL1500_.jpg" style={{width:'500px', height:'auto', position: 'absolute',
                    top:'calc(50% - 250px)',
                    left:'calc(50% - 250px)',
                    borderRadius: '500%'
                }}/>
            </div>
            )
    }
});

var ArtistSong = React.createClass({
    getDefaultProps: function(){
        return{
            artist: 'Mana',
            duration: '30s',
            album: 'Cama Incendiada',
            albumImage: 'http://placehold.it/150'
        }
    },
    render: function(){
        var props = this.props;
        return (
            <div className='artist-song' style={{width: '100%', height: '50px', marginBottom: '5px'}}>
                <div style={{width:'50px',height:'50px', float: 'left'}}>
                    <img src={props.albumImage} className='img-responsive' />
                </div>
                <div className='song-info' style={{width:'calc(100% - 50px)',height:'50px', float: 'left'}}>
                    <h3 style={{color:'#fff', margin: '0'}}>{props.name}<small style={{color:'#fff'}}>{' '+props.artist}</small></h3>
                    <hr style={{margin: '0'}}/>
                    <h4 style={{color:'#E0E0E0', margin: '0'}}>{props.album}<small style={{color:'#E0E0E0'}}>{' '+props.artist}</small></h4>
                </div>
            </div>
            )
    }
});

var ArtistPlaylist = React.createClass({
    render: function(){
        var props = this.props;
        var length = props.songs.length;
        var songsComponents = new Array(length);
        if (length !== 0) {
            var songs = props.songs;
            while (length--) {
                song = songs[length];
                songsComponents[length] = <ArtistSong key={song.id} {...song}/>
            }
        }
        return(
            <div style={{width: '25%',height: '100%', float: 'left'}}>
                <div id='header-artist-playlist' style={{height: '75px',padding: '0px 20px'}}>
                    <h2 style={{color:'#fff',margin:'0',lineHeight:'75px'}}> Select your favorite songs </h2>
                </div>
                <div className='mCustomScrollbar' data-mcs-theme='light' style={{height:'calc(100% - 75px)',padding: '20px 0 20px 20px'}}>
                    {songsComponents}
                </div>
            </div>
            )
    }
});

module.exports = PlayListCreator;
