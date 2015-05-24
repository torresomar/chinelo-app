var React = require('react');
var GoogleMap = require('./google-map');
var NavIcon = require('./navicon');
var VenueItem = require('./venue-item');
var VenueMarker = require('./google-marker');
// Mixins
var SidebarBase = require('../mixins/side-bar');

var Landing = React.createClass({
    getInitialState: function(){
        return {
            latitud: 19.271752,
            longitud: -99.161944,
            zoom: 12,
            venueVisible: true,
            width: "calc(100% - " + 555 +"px)",
            left: 555,
            height: 'calc(100% - ' +  0 + 'px)',
            top: 0,
            venues: []
        }
    },
    displayVenueBar: function(){
        var venueIsVisible = this.state.venueVisible;
        this.setState({
            venueVisible: !venueIsVisible
        }, this.getMapDimensions);
    },
    getMapDimensions: function(){
        var state = this.state;
        var width = 0;
        var left = 0;
        var topValue = 0;
        if(state.venueVisible){
           width+= 555; 
           left+= 555;
        }
        this.setState({
            width: "calc(100% - " + width +"px)",
            left: left,
            height: 'calc(100% - ' + topValue + 'px)',
            top: topValue
        });
    },
    getMap: function () {
        return this.refs.map.mapRef;
    },
    componentDidMount: function(){
        this.setState({
            venues: [{sample: "hey"},{sample: "dude"},{sample: "here"}]
        });
    },
    shouldComponentUpdate: function(nextProps, nextState){
        var current = this.state;
        if(current.width !== nextState.width || current.venues.length !== nextState.venues.length){
            return true;
        }else{
            return false;
        }
    },
    render: function(){
        var map,
            venuesSideBar, 
            venuesMarkers;
        var state = this.state;
        var venues = state.venues
        var cachedLength =  venues.length
        var length = cachedLength;
        var dimensionMap = {
            width: state.width,
            left: state.left,
            height: state.height,
            top:state.top,
            WebkitTransition: 'all 0.5s ease',
            MozTtransition: 'all 0.5s ease',
            transition: 'all 0.5s ease'
        };
        if (length !== 0) {
            map = this.getMap();
            venuesMarkers = new Array(length);
            venuesSideBar = new Array(length);
            while (length--) {
                venue = venues[length];
                venuesMarkers[length] = <VenueMarker map={map} latitud={19.370520} longitud={-99.176186} />;
            }
        }
        return(
            <div style={{height: '100%', width: '100%'}}>
                {venuesMarkers}
                <GoogleMap latitud={Number(this.state.latitud)} longitud={Number(this.state.longitud)}
                zoom={[Number(this.state.zoom), 1, 21]} style={dimensionMap} ref='map'>
                </GoogleMap>
                <VenueBar side={'left'} width={'555'} show={this.state.venueVisible} top={0} display={this.displayVenueBar}/>
            </div>
            )
    }
});

var VenueBar = React.createClass({
    mixins: [SidebarBase],
    render: function(){
        return(
            <div className="venue-sidebar map-canvas" style={this.baseStyles()}>
                <div className="inner" style={{height:'100%',overflow:'hidden'}}>
                    <ul className="results list mCustomScrollbar" data-mcs-theme="dark" style={{listStyle: 'none', height:'calc(100% - 0px)'}}>
                        <VenueItem image={"http://www.lgmstudio.com/files/gimgs/95_20120513auditoriobb0588.jpg"} name={"Auditorio Blackberry"}
                            address={"Calle Tlaxcala 160, Cuauhtemoc, Hipódromo Condesa, 06170 Ciudad de México, D.F."}
                            price={590}/>
                        <VenueItem image={"http://cdn.djoybeat.com/wp-content/uploads/2013/02/50e5a51bb3fc4b327e000123_el-plaza-condesa-mu-ohierro-esrawe-studio_fc_0703.jpg"}
                            name={"El Plaza Condesa"}
                            address={"Juan Escutia 4, Cuauhtémoc, Condesa, 06140 Ciudad De Mexico, D.F."}
                            price={400}/>
                        <VenueItem image={"https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/c0.159.851.315/p851x315/10525855_747980745241301_3343636875650654563_n.jpg?oh=399e58d8472be99fb4d24c88689b48d9&oe=558DF571&__gda__=1438479318_9a35b49b7b55ea1765bcd3362868f276"} name={"Foro Indie Rocks"}
                            address={"Calle Zacatecas 39 Cuauhtémoc, Roma Norte, Ciudad de México, D.F."}
                            price={590}/>
                        <VenueItem image={"http://www.lgmstudio.com/files/gimgs/95_20120513auditoriobb0588.jpg"} name={"Auditorio Blackberry"}
                            address={"Calle Tlaxcala 160, Cuauhtemoc, Hipódromo Condesa, 06170 Ciudad de México, D.F."}
                            price={590}/>
                        <VenueItem image={"http://www.lgmstudio.com/files/gimgs/95_20120513auditoriobb0588.jpg"} name={"Auditorio Blackberry"}
                            address={"Calle Tlaxcala 160, Cuauhtemoc, Hipódromo Condesa, 06170 Ciudad de México, D.F."}
                            price={590}/>
                        <VenueItem image={"http://cdn.djoybeat.com/wp-content/uploads/2013/02/50e5a51bb3fc4b327e000123_el-plaza-condesa-mu-ohierro-esrawe-studio_fc_0703.jpg"}
                            name={"El Plaza Condesa"}
                            address={"Juan Escutia 4, Cuauhtémoc, Condesa, 06140 Ciudad De Mexico, D.F."}
                            price={400}/>
                        <VenueItem image={"http://www.lgmstudio.com/files/gimgs/95_20120513auditoriobb0588.jpg"} name={"Auditorio Blackberry"}
                            address={"Calle Tlaxcala 160, Cuauhtemoc, Hipódromo Condesa, 06170 Ciudad de México, D.F."}
                            price={590}/>
                        <VenueItem image={"http://www.lgmstudio.com/files/gimgs/95_20120513auditoriobb0588.jpg"} name={"Auditorio Blackberry"}
                            address={"Calle Tlaxcala 160, Cuauhtemoc, Hipódromo Condesa, 06170 Ciudad de México, D.F."}
                            price={590}/>
                    </ul>
                </div>
                <NavIcon styling={{position: 'absolute',right: '-64px',top: 'calc(50% - 55px)',background: '#2A2A2A',padding: '30px 17px'}} 
                    displaySideBar={this.props.display}
                    opened={this.props.show}/>
            </div>
            )
    }
});

module.exports = Landing;
