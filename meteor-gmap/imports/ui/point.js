import { Template } from 'meteor/templating';
import { Points } from '../api/points.js';
import './point.html';


Template.point.events({
    'click .delete-point'() {
        Points.remove(this._id);
    },
    'click .load-point'() {
        var center = new google.maps.LatLng(this.lat, this.lon);
        GoogleMaps.maps.exampleMap.instance.setCenter(center);
    },
});