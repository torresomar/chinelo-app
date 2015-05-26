var React = require('react');

var Marker = React.createClass({
    getDefaultProps: function () {
        return {
            draggable: false,
            onDrag: undefined,
            color: 'red',
            activeColor: undefined
        };
    },
    componentDidMount: function () {
        var props = this.props;
        var markerContent = document.createElement('div');
        markerContent.innerHTML =
        '<div class="map-marker ' + '">' +
            '<div class="icon">' +
                '<img src="' + IMAGES['emmanuel'] +  '">' +
            '</div>' +
        '</div>';
        this.marker = new RichMarker({
            position: new google.maps.LatLng(props.latitude, props.longitude),
            map: props.map,
            draggable: false,
            content: markerContent,
            flat: true
        });
        
        var infoboxContent = document.createElement("div");
        this.infoboxOptions = {
            content: infoboxContent,
            position: new google.maps.LatLng(props.latitude, props.longitude),
            disableAutoPan: false,
            pixelOffset: new google.maps.Size(-18, -42),
            zIndex: null,
            alignBottom: true,
            boxClass: "infobox",
            enableEventPropagation: true,
            closeBoxMargin: "0px 0px -30px 0px",
            closeBoxURL: IMAGES['close'],
            infoBoxClearance: new google.maps.Size(1, 1)
        };
        this.drawInfoBox(infoboxContent,props);
        this.marker.infobox = new InfoBox(this.infoboxOptions);
        var infobox = this.marker.infobox;
        infobox._venueId = props.id;
        infobox._venueMarker = this.marker;
        var marker = this.marker;
        props.pushMarker(marker);
        google.maps.event.addListener(marker, 'click', function(){
            var latest = props.getLatest();
            if(latest !== null && marker.infobox._venueId !== latest.infobox._venueId){
                latest.infobox.close(); 
                latest.setZIndex(99);
                latest.content.className = 'marker-loaded';
            }
            props.setLatest(marker); 
            infobox._venueMarker.setZIndex(100);
            infobox.open(props.map, infobox);
            infobox.setOptions({ boxClass:'fade-in-marker'});
            markerContent.className = 'marker-active marker-loaded';
        });
        google.maps.event.addListener(marker.infobox, 'closeclick', function(){
            marker.content.className = 'marker-loaded';
            marker.infobox.setOptions({ boxClass:'fade-out-marker' });
        });
    },
    drawInfoBox: function(infoboxContent, props){
        infoboxContent.innerHTML =
        '<div class="infobox">' +
            '<div class="inner">' +
                '<div class="image">' +
                    '<div class="overlay">' +
                        '<div class="wrapper">' +
                            '<a href="#" class="quick-view" data-toggle="modal" data-target="#modal" id="' + 122 + '">Quick View</a>' +
                            '<hr>' +
                            '<a href="' + "#" +  '" class="detail">Go to Detail</a>' +
                        '</div>' +
                    '</div>' +
                    '<a href="' + "#" +  '" class="description">' +
                        '<div class="meta">' +
                            '<div class="type">' + props.created_at +  '</div>' +
                            '<h2>' + props.building +  '</h2>' +
                            '<figure>' + "" +  '</figure>' +
                            '<i class="fa fa-angle-right"></i>' +
                        '</div>' +
                    '</a>' +
                    '<img src="' + props.imageurl +  '">' +
                '</div>' +
            '</div>' +
        '</div>';
    },
    componentWillReceiveProps : function(next_props) {
        this.marker.setPosition(new google.maps.LatLng(next_props.latitude, next_props.longitude));
    },
    render: function(){
        return null;
    }
});

module.exports = Marker;
