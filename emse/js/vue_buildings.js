/**
 * Created by Malshani Ranchagoda on 03/01/2020.
 */


var urlBuildings = "https://faircorp-emse.cleverapps.io/api/buildings";


var app = new Vue({
    el: '#app',
    data: {
        //loading: true,
        buildings: []
    },

    created: function () {
        this.loadBuildings();
    },

    methods: {
        loadBuildings: function () {
            axios.get(urlBuildings)
                .then(function (response) {
                    app.buildings = response.data;
                });
        },
        getAllBuildings () {
            axios.get(urlRooms)
                .then(function (response) {
                    app.buildings = response.data;
                });
        },

        editBuildingDisplay(id, name){
            $("#divSearchRoom").hide();
            $("#divAddRoom").show();
            $("#btn-add").hide();
            $("#btn-edit").show();
            $("#roomName").val(name);
            $("#building").val(id);
        },
    }
})



