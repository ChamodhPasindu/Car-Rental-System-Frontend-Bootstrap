$("#btnDriverSave").click(function (){

    var driverDTO={
        nic:$("#save-driver-nic").val(),
        driver_name:$("#save-driver-name").val(),
        address:$("#save-driver-address").val(),
        license_no:$("#save-driver-license").val(),
        mobile:$("#save-driver-mobile").val(),
        join_date:$("#save-driver-date").val(),
        user_name:$("#save-driver-user-name").val(),
        password:$("#save-driver-password").val(),
    }
    var serialize = $("#driverSaveForm").serialize();
    console.log(serialize)

    $.ajax({
        url: baseUrl+"controller/driver/addDriver",
        method: "POST",
        contentType:"application/json",
        data: JSON.stringify(driverDTO),
        success: function (res) {
            if (res.status === 200) {
                alert(res.message);
            }
        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    })
})

$("#admin-driverBtn").click(function (){
    $("#admin-all-drivers-title").css("display","block")
    $("#admin-all-driverSchedule-title").css("display","none")

    $("#admin-driver-table").css("display","block")
    $("#admin-driver-schedule-table").css("display","none")

    $("#enableSaveDriverBtn").css("display","block");
    $("#enableSearchDriverBtn").css("visibility","hidden");
})



$("#admin-scheduleBtn").click(function (){
    $("#admin-all-drivers-title").css("display","none")
    $("#admin-all-driverSchedule-title").css("display","block")

    $("#admin-driver-table").css("display","none")
    $("#admin-driver-schedule-table").css("display","block")

    $("#enableSaveDriverBtn").css("display","none");
    $("#enableSearchDriverBtn").css("visibility","visible");

    loadDriverSchedule()
})

function loadAllDrivers() {
    $("#admin-all-drivers-table").empty();

    $.ajax({
        url: baseUrl + "controller/driver/allDriverDetail",
        method: "GET",
        success: function (resp) {
            for (const driver of resp.data) {
                let row = `<tr><td>${driver.nic}</td><td>${driver.driver_name}</td><td>${driver.address}</td><td>${driver.mobile}</td><td>${driver.join_date}</td></tr>`;
                $("#admin-all-drivers-table").append(row);
            }
        }
    });
}
function loadDriverSchedule() {

}


