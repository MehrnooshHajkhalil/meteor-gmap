import { Template } from 'meteor/templating';
import { Points } from '../api/points.js';
import './point.js';
import './body.html';


if (Meteor.isClient) {
    Template.body.helpers({
        points() {
            return Points.find({},{ sort: { createdAt: -1 } });
        },
        pointsCount() {
            return Points.find().count();
        }
    });

    Meteor.startup(function () {
        GoogleMaps.load();
    });

    Template.body.helpers({
        exampleMapOptions: function () {
            if (GoogleMaps.loaded()) {
                return {
                    center: new google.maps.LatLng(35.7571697, 51.316710900000004),
                    zoom: 8
                };
            }
        }
    });

    Template.body.events({
        'click .find-me'(event) {
            function setPointtoDb(position) {
                var center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                GoogleMaps.maps.exampleMap.instance.setCenter(center);
                Points.insert({
                    lat:position.coords.latitude,
                    lon :  position.coords.longitude,
                    createdAt : new Date
                });
            }
            navigator.geolocation.getCurrentPosition(setPointtoDb);
        }
    });


    Template.body.onCreated(function () {
        GoogleMaps.ready('exampleMap', function (map) {
            var marker = new google.maps.Marker({
                position: map.options.center,
                map: map.instance
            });
        });
    });
}

