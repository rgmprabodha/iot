/**
 * Created by Malshani Ranchagoda on 02/01/2020.
 */


//jQuery.support.cors=true;
//var urlRooms = "http://thawing-journey-78988.herokuapp.com/api/rooms";

var urlRooms = "https://faircorp-emse.cleverapps.io/api/rooms";


Vue.use(VueMaterial.default)

Vue.component('modal', {
    template: '#modal-template'
})

var app = new Vue({
    el: '#app',
    data: {
        //loading: true,
        rooms: [],
        lights: [],
        room: 0,
        showModal: false
    },
    created: function () {
        this.loadRooms();
    },
    methods: {
        loadRooms: function () {
            axios.get(urlRooms)
                .then(function (response) {
                    app.rooms = response.data;
                });
        },

        getLights() {
            let url = "https://faircorp-emse.cleverapps.io/api/rooms/getLights/" + room;
            //this.loading = true;

            axios.get(url, {roomId: room})
                .then(function (response) {
                    app.lights = response.data;
                    //app.loading = false;
                });
        },

        onChange(event) {
            room = event.target.value;
        },

        switchLightMethod(light) {
            let put_url = "https://faircorp-emse.cleverapps.io/api/lights/" + light + "/switch_get_room_lights";
            app.loading = true;
            axios.put(put_url, {lightId: light}) // TODO put change get to put, even in rest api
                .then(function (response) {
                    app.lights = response.data;
                    app.loading = false;
                });
        },
    }
})





