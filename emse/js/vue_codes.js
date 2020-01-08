/**
 * Created by Malshani Ranchagoda on 27/11/2019.
 */

var app = new Vue({
    el: '#app',
    data: {
        loading: true,
        //id: '',
        //lightStatus: '',
        //imageLight: 'images/light-on.png',
        //lightLevel: '',
        //ringerStatus: '',
        //imageNoise: 'images/ringer-on.png',
        //noiseLevel: '',
        //switchLight: 'images/switch.png',
        //switchRinger: 'images/switch.png',
        rooms: []
    },
    created: function () {
        this.loadQuote();
    },
    methods: {
        loadQuote: function () {
            this.loading = true;

            axios.get('http://thawing-journey-78988.herokuapp.com/api/rooms')
                //.then(response => {
                //    this.rooms = response.data
                //});

                .then(function (response) {
                    app.rooms = response.data;
                    app.loading = false;
                });

            //then(function (response) {
            //    this.rooms = response.data;
            //app.message = responseData;
            //
            //responseData.forEach(function (obj) {
            //    lightStatus = obj.light.status;
            //    ringerStatus = obj.noise.status;
            //    if (lightStatus == "ON") {
            //        imageLight = "images/light-on.png";
            //    } else {
            //        imageLight = "images/light-off.png";
            //    }
            //    if (ringerStatus == "ON") {
            //        imageNoise = "images/ringer-on.png";
            //    } else {
            //        imageNoise = "images/ringer-off.png";
            //    }
            //    var room = {
            //        id: obj.id,
            //        imageLight: imageLight,
            //        imageNoise: imageNoise,
            //        lightLevel: obj.light.level,
            //        noiseLevel: obj.noise.level,
            //        switchLight: app.switchLight,
            //        switchRinger: app.switchRinger
            //    };
            //    app.rooms.push(room)
            //});
            //});
        },

        switchLightMethod(room) {
            let post_url = "http://thawing-journey-78988.herokuapp.com/api/rooms/" + room + "/switch-light-and-list";
            app.loading = true;
            axios.put(post_url, {roomId: room})
                .then(function (response) {
                    app.rooms = response.data;
                    app.loading = false;
                });
        },
        switchRingerMethod(room) {
            let post_url = "http://thawing-journey-78988.herokuapp.com/api/rooms/" + room + "/switch-ringer-and-list";
            app.loading = true;
            axios.put(post_url, {roomId: room})
                .then(function (response) {
                    app.rooms = response.data;
                    app.loading = false;
                });
        }
    }
})
//
//var app2 = new Vue({
//    el: '#app-2',
//    data: {
//        message: 'You loaded this page on ' + new Date().toLocaleString()
//    }
//})
//
//var app3 = new Vue({
//    el: '#app-3',
//    data: {
//        seen: true
//    }
//})
