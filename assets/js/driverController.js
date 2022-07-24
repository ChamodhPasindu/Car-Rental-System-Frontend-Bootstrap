$("#btnDriverSave").click(function () {

    var driverDTO = {
        nic: $("#save-driver-nic").val(),
        driver_name: $("#save-driver-name").val(),
        address: $("#save-driver-address").val(),
        license_no: $("#save-driver-license").val(),
        mobile: $("#save-driver-mobile").val(),
        join_date: $("#save-driver-date").val(),
        user_name: $("#save-driver-user-name").val(),
        password: $("#save-driver-password").val(),
    }
    var serialize = $("#driverSaveForm").serialize();
    console.log(serialize)

    $.ajax({
        url: baseUrl + "controller/driver/addDriver",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(driverDTO),
        success: function (res) {
            if (res.status === 200) {
                alert(res.message);
                loadAllDrivers()
            }
        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    })
})

$("#admin-driverBtn").click(function () {
    $("#admin-all-drivers-title").css("display", "block")
    $("#admin-all-driverSchedule-title").css("display", "none")

    $("#admin-driver-table").css("display", "block")
    $("#admin-driver-schedule-table").css("display", "none")

    $("#enableSaveDriverBtn").css("display", "block");
    $("#enableSearchDriverBtn").css("visibility", "hidden");

    loadAllDrivers()
})


$("#admin-scheduleBtn").click(function () {
    $("#admin-all-drivers-title").css("display", "none")
    $("#admin-all-driverSchedule-title").css("display", "block")

    $("#admin-driver-table").css("display", "none")
    $("#admin-driver-schedule-table").css("display", "block")

    $("#enableSaveDriverBtn").css("display", "none");
    $("#enableSearchDriverBtn").css("visibility", "visible");

    $("#admin-driver-start-date").val(today);
    $("#admin-driver-end-date").val(today);

    loadDriverScheduleForAdmin();


})

$("#admin-driver-schedule-searchBtn").click(function (){
    loadDriverScheduleForAdmin();
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

function loadDriverSchedule(data) {
    $("#driver-schedule").empty();


    $.ajax({
        url: baseUrl + "controller/driver/weeklyAndMonthlyScheduleByDriver?id=" + data.nic + "&date=Weekly",
        method: "GET",
        success: function (resp) {
            if (resp.message === 200) {
                for (const schedule of resp.data) {
                    let row = `<tr><td>${schedule.carReservation.reserve_id}</td><td>${schedule.start_time}</td><td>${schedule.start_date}</td>
                <td>${schedule.end_date}</td></tr>`;
                    $("#driver-schedule").append(row);
                }
            } else {
                alert("You Have Not Any Schedule in this week")
            }

        }, error: function (ob) {
            alert("You Have Not Any Schedule in this week")
        }
    });
}

function loadDriverScheduleForAdmin() {
    var start = $("#admin-driver-start-date").val();
    var end = $("#admin-driver-end-date").val();

    $("#admin-all-driver-schedule-table").empty();

    $.ajax({
        url: baseUrl + "controller/driver/driverScheduleByDate?start_date="+start+"&end_date="+end,
        method: "GET",
        success: function (resp) {
            if (resp.message === 200) {
                for (const schedule of resp.data) {
                    let row = `<tr><td>${schedule.schedule_id}</td><td>${schedule.driver.driver_name}</td><td>${schedule.start_time}</td>
                <td>${schedule.start_date}</td><td>${schedule.end_date}</td></tr>`;
                    $("#admin-all-driver-schedule-table").append(row);
                }
            }
        }, error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    });
}

