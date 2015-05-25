// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require utilities/images
//= require jquery.mCustomScrollbar.concat.min
//= require infobox
//= require richmarker-compiled.js
//= require markerclusterer.js
var React = require('react');
var Routes = {
    '': function() {
        var Landing = require('./components/venue-songifier');
        React.render(
                React.createElement(Landing),
                document.getElementById('landing-container')
            );
    }
}
$(document).on('ready', function(){
    var base_path = document.location.pathname.split("/")[1].toString();
    Routes[base_path]();
});
