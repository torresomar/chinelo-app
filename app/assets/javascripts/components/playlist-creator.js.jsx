var React = require('react');
var _ = require('lodash');

var PlayListCreator = React.createClass({
    componentDidMount: function(){
        document.body.style.opacity = "1";
    },
    render: function(){
        return(
            <div style={{height: '100%', width: '100%', background: '#222'}}>
                <VenueTopBar url={'locations'}/>
                <InteractionContainer url={'songs'}/>
            </div>
            )
    }
});

var VenueTopBar = React.createClass({
    getInitialState: function(){
        return{
            building: 'Resolving building name...',
            address: 'Resolving address...'
        }
    },
    componentDidMount: function(){
        $.ajax({
            url: 'location',
            dataType: 'json',
            cache: false,
            success: function(data) {
                if(data.hasOwnProperty('building')){
                    this.setState({
                        building: data.building,
                        address: data.address
                    });
                }else{
                    window.location.href = '/';
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(xhr,status,err);
            }.bind(this)
        });
    },
    render: function(){
        return(
            <div style={{height:'59px',width:'100%', position: 'relative', background: '#222',zIndex: '2'}}>
                <h1 style={{background:'#ff513f', color: '#fff', padding: '20px', display: 'inline-block', width:'75%'}}>
                    {this.state.building}
                    <small style={{color:'#E0E0E0'}}> {this.state.address}</small>
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
    addSongToUserPlayList: function(song){
        var state = this.state;
        var playListSongs = state.playListSongs;
        var repeated = _.find(playListSongs, {'id': +song.id});
        if(typeof repeated === 'undefined'){
            playListSongs.push(song);
        }else{
            alert("That Song is already in your playlist");
            return;
        }
        this.associateSongToUser(+song.id,playListSongs)
    },
    associateSongToUser: function(songId,playListSongs){
        $.ajax({
            url: 'songs/' + songId + '/associate',
            type: 'POST',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({
                    playListSongs: playListSongs
                });
            }.bind(this),
            error: function(xhr, status, err) {
                alert(err);
                console.log(xhr,status,err);
            }.bind(this)
        });
    },
    handleDrop: function(e) {
        e.target.style.borderWidth = "1px";
        e.stopPropagation();
        var songs = this.state.artistSongs;
        var songId = e.dataTransfer.getData('text/plain');
        var song = _.find(songs, {'id': +songId});
        this.addSongToUserPlayList(song);
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
                $.ajax({
                    url: 'preview',
                    dataType: 'json',
                    cache: false,
                    success: function(songs) {
                        this.setState({
                            artistSongs: data,
                            playListSongs: songs
                        });
                    }.bind(this),
                    error: function(xhr, status, err) {
                        console.log(xhr,status,err);
                    }.bind(this)
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
                <VenueArtistDisplay previewUrl='https://p.scdn.co/mp3-preview/0f97bd2f2141d7b672a30c114af8c47719acd9e9' />
                <ArtistPlaylist songs={this.state.artistSongs} handleDragStart={this.handleDragStart} />
                <UserPlayList handleDrop={this.handleDrop} songs={this.state.playListSongs}/>
            </div>
            )
    }
});
var UserPlayList = React.createClass({
    getInitialState: function() {
        return {
            borderWidth: 1
        }
    },
    exportPlaylist: function(){
        $.post('playlist');
    },
    handleDragEnter: function(e) {
        this.setState({ borderWidth: 2 });
    },
    handleDragLeave: function(e) {
        this.setState({ borderWidth: 1 });
    },
    handleDragOver: function(e) {
        if (e.preventDefault) {
            e.preventDefault(); // allows us to drop
        }
        e.dataTransfer.dropEffect = 'copy';
    },
    render: function(){
        var style = {
            width: '100%',
            height: 'calc(100% - 70px - 75px)',
            border: this.state.borderWidth + "px dashed white",
            borderRadius: '5px',
            padding: '20px 20px 20px 20px',
            overflow: 'hidden',
            overflowY: 'auto'
        };
        var props = this.props;
        var length = props.songs.length;
        var songsComponents = new Array(length);
        if (length !== 0) {
            var songs = props.songs;
            while (length--) {
                song = songs[length];
                songsComponents[length] = <PlayListSong key={song.id} {...song} drag={props.handleDragStart}/>
            }
        }
        return(
            <div style={{width: '25%',height: '100%', float: 'left', background: '#2F2F2F', padding: '20px'}}>
                <div style={{height: '70px'}}>
                    <h2 style={{color: '#fff', margin: '0', lineHeight: '35px'}}>
                        CREATE THE PLAYLIST YOU WANT TO HEAR
                    </h2>
                </div>
                <div onDragOver={this.handleDragOver}
                    onDragEnter={this.handleDragEnter}
                    onDragLeave={this.handleDragLeave} 
                    onDrop={this.props.handleDrop}
                    style={style}>
                    {songsComponents}
                </div>
                <div style={{height:'75px',padding: '20px 0px 20px 0px'}}>
                    <button className='btn btn-block' style={{width: '100%'}} onClick={this.exportPlaylist}>
                        EXPORT PLAYLIST
                    </button>
                </div>
            </div>
            )
    }
});

var PlayListSong = React.createClass({
    getDefaultProps: function(){
        return{
            artista: 'Maná',
        }
    },
    render: function(){
        var props = this.props;
        return (
            <div className='play-list-song' style={{width: '100%', height: '80px', marginBottom: '5px'}}>
                <div className='playlist-song' style={{width:'calc(100%)',height:'80px'}}>
                    <div style={{width: '80px', float: 'left'}}>
                        <img style={{width:'80px',height:'80px',  borderRadius: '2px 0 0 2px'}} src={props.small_image} className='img-responsive'/>
                    </div>
                    <div style={{width: 'calc(100% - 80px)', float: 'left', paddingLeft: '5px'}}>
                        <p style={{color:'#fff', margin: '0'}}>{props.name}<small style={{color:'#fff'}}>{' - '+props.artista}</small></p>
                        <p style={{color:'#E0E0E0', margin: '0'}}>{props.uri}</p>
                    </div>
                </div>
            </div>
            )
    }
});

var VenueArtistDisplay = React.createClass({
    render: function(){
        return(
            <div style={{width: '50%',height: '100%', float: 'left', position: 'relative'}}>
                <img src="https://scontent-lax1-1.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/11017670_10155291356625188_1245432389474863937_n.jpg?oh=a0ee4be0f9479c5d7f36205a27750061&oe=55C0B629" style={{width:'100%', height:'100%', position: 'absolute', top: '0', left: '0', opacity: '0.2'}}/>
                <img src="http://ecx.images-amazon.com/images/I/91k0SfKvlLL._SL1500_.jpg" style={{width:'500px', height:'auto', position: 'absolute',
                    top:'calc(50% - 250px)',
                    left:'calc(50% - 250px)',
                    borderRadius: '500%'
                }}/>
                <audio controls style={{width:'100%', position: 'absolute', bottom: 0, left: 0}}>
                    <source src={this.props.previewUrl} type="audio/mp3" />
                </audio>
            </div>
            )
    }
});

var ArtistSong = React.createClass({
    getDefaultProps: function(){
        return{
            artista: 'Maná'
        }
    },
    render: function(){
        var props = this.props;
        return (
            <div className='artist-song' style={{width: '100%', height: '60px', marginBottom: '5px'}} draggable="true"
                data-item={props.id} onDragStart={this.props.drag}>
                <div className='song-info' style={{width:'calc(100%)',height:'60px'}}>
                    <div style={{width: '50px', float: 'left'}}>
                        <img style={{width:'50px',height:'50px'}} src={props.small_image} className='img-responsive'/>
                    </div>
                    <div style={{width: 'calc(100% - 50px)', float: 'left', paddingLeft: '5px'}}>
                        <p style={{color:'#fff', margin: '0'}}>{props.name}<small style={{color:'#fff'}}>{' - '+ props.artista}</small></p>
                        <p style={{color:'#E0E0E0', margin: '0'}}>{props.album}<small style={{color:'#E0E0E0'}}>{' '+props.artist}</small></p>
                    </div>
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
                songsComponents[length] = <ArtistSong key={song.id} {...song} drag={props.handleDragStart} />
            }
        }

        return(
            <div style={{width: '25%',height: '100%', float: 'left'}}>
                <div id='header-artist-playlist' style={{height: '75px',padding: '0px 20px'}}>
                    <h2 style={{color:'#fff',margin:'0',lineHeight:'75px'}}> Select your favorite songs </h2>
                </div>
                <div className='mCustomScrollbar' data-mcs-theme='light-thick' style={{height:'calc(100% - 75px)',padding: '20px 0 20px 20px'}}>
                    {songsComponents}
                </div>
            </div>
            )
    }
});

module.exports = PlayListCreator;
