/**
 * Created by Malshani Ranchagoda on 20/12/2019.
 */

//jQuery.support.cors=true;
//var urlRooms = "http://thawing-journey-78988.herokuapp.com/api/rooms";

var urlRooms = "https://faircorp-emse.cleverapps.io/api/rooms";
var urlBuildings = "https://faircorp-emse.cleverapps.io/api/buildings";


var app = new Vue({
    el: '#app',
    data: {
        //loading: true,
        buildings: [],
        rooms: [],
        building: 0,
        roomName: "New Room",
        room: {
            name: "name",
            id: 0
        }

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
            axios.get(urlBuildings)
                .then(function (response) {
                    app.buildings = response.data;
                });
        },

        getAllRooms () {
            axios.get(urlRooms)
                .then(function (response) {
                    app.rooms = response.data;
                });
        },

        getRooms() {
            let url = "https://faircorp-emse.cleverapps.io/api/buildings/getRooms/" + building;
            //this.loading = true;

            axios.get(url, {buildingId: building})
                .then(function (response) {
                    app.rooms = response.data;
                    //app.loading = false;
                });
        },

        onChange(event) {
            building = event.target.value;
        },

        saveRoom(){
            console.log(roomName.value);
            console.log(building);
            let url = "https://faircorp-emse.cleverapps.io/api/buildings/getRooms/" + building;
            //this.loading = true;

            axios.get(url, {buildingId: building})
                .then(function (response) {
                    app.rooms = response.data;
                    //app.loading = false;
                });
        },

        editRoomDisplay(id, name, buildingId, buildingName){
            app.room.id = id;
            app.room.name = name;
            $("#divSearchRoom").hide();
            $("#divAddRoom").show();
            $("#btn-add").hide();
            $("#btn-edit").show();
            $("#roomName").val(name);
            $("#building").val(buildingId);
        },

        editRoomSubmit(buildingId, buildingName){
            let url = "https://faircorp-emse.cleverapps.io/api/rooms/getRooms/" + building;
            //this.loading = true;

            axios.get(url, {buildingId: buildingId, buildingName: buildingName})
                .then(function (response) {
                    app.rooms = response.data;
                    //app.loading = false;
                });

        }
    }
})





