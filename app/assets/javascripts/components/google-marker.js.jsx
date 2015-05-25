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
        this.infobox = new InfoBox(this.infoboxOptions);
        this.infobox._venueId = props.id;
        var marker = this.marker;
        var infobox = this.infobox;
        google.maps.event.addListener(marker, 'click', function(){
            var latest = props.getLatest();
            if(latest !== null && infobox._venueId !== latest._venueId){
               latest.close(); 
            }
            props.setLatest(infobox); 
            infobox.open(props.map, infobox);
            infobox.setOptions({ boxClass:'fade-in-marker'});
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
        this.marker.setPosition(new google.maps.LatLng(next_props.latitud, next_props.longitud));
    },
    render: function(){
        return null;
    }
});

module.exports = Marker;
