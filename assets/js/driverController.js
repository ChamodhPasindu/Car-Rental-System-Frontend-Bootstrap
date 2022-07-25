var driver_nic;

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
    $("#admin-driver-viewDetailsBtn").css("visibility", "visible");

    loadAllDrivers()
})


$("#admin-scheduleBtn").click(function () {
    $("#admin-all-drivers-title").css("display", "none")
    $("#admin-all-driverSchedule-title").css("display", "block")

    $("#admin-driver-table").css("display", "none")
    $("#admin-driver-schedule-table").css("display", "block")

    $("#enableSaveDriverBtn").css("display", "none");
    $("#enableSearchDriverBtn").css("visibility", "visible");

    $("#admin-driver-viewDetailsBtn").css("visibility", "hidden");

    $("#admin-driver-start-date").val(today);
    $("#admin-driver-end-date").val(today);

    loadDriverScheduleForAdmin();


})

$("#admin-driver-schedule-searchBtn").click(function (){
        loadDriverScheduleForAdmin()
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

                $("#admin-all-drivers-table>tr").off("click");
                $("#admin-all-drivers-table>tr").click(function () {
                    driver_nic = $(this).children(":eq(0)").text();
                    $("#admin-driver-viewDetailsBtn").prop('disabled', false);

                });
            }
        }
    });
}

function setDataToVieDriverModal(data) {
    $("#admin-update-driver-userName").val(data.user_name)
    $("#admin-update-driver-name").val(data.driver_name)
    $("#admin-update-driver-address").val(data.address)
    $("#admin-update-driver-joinDate").val(data.join_date)
    $("#admin-update-driver-license").val(data.license_no)
    $("#admin-update-driver-mobile").val(data.mobile)
    $("#admin-update-driver-nic").val(data.nic)
    $("#admin-update-driver-password").val(data.password)
}

$("#btnUpdateDriver").click(function () {
    var driver={
        nic:  $("#admin-update-driver-nic").val() ,
        address:  $("#admin-update-driver-address").val() ,
        driver_name:$("#admin-update-driver-name").val(),
        join_date:$("#admin-update-driver-joinDate").val() ,
        license_no:$("#admin-update-driver-license").val() ,
        mobile: $("#admin-update-driver-mobile").val(),
        password:$("#admin-update-driver-password").val() ,
        user_name: $("#admin-update-driver-userName").val(),
    }

    $.ajax({
        url: baseUrl + "controller/driver/updateDriver",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(driver),
        success: function (resp) {
            if (resp.status===200){
                alert(resp.message)
                loadAllDrivers()

            }
        },
        error: function (err) {
            console.log(err);
        }
    });

})

$("#admin-driver-viewDetailsBtn").click(function () {
    console.log(driver_nic)
    if (driver_nic==null){
        return
    }
    $.ajax({
        url: baseUrl + "controller/driver/driverDetail/"+driver_nic,
        method: "GET",
        success: function (resp) {
            if (resp.status===200){
                console.log(resp.data)
                setDataToVieDriverModal(resp.data);
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
})

function loadDriverSchedule(data) {
    $("#driver-schedule").empty();

    console.log(data.nic)

    $.ajax({
        url: baseUrl + "controller/driver/weeklyAndMonthlyScheduleByDriver?id=" + data.nic + "&date=Weekly",
        method: "GET",
        success: function (resp) {
            if (resp.status === 200) {
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
    $("#admin-all-drivers-schedule-table").empty();

    var start = $("#admin-driver-start-date").val();
    var end = $("#admin-driver-end-date").val();


    $.ajax({
        url: baseUrl + "controller/driver/driverScheduleByDate?start_date="+start+"&end_date="+end,
        method: "GET",
        success: function (resp) {
            if (resp.status === 200) {
                for (const schedule of resp.data) {
                    let row = `<tr><td>${schedule.schedule_id}</td><td>${schedule.driver.driver_name}</td><td>${schedule.start_time}</td>
                <td>${schedule.start_date}</td><td>${schedule.end_date}</td></tr>`;
                    $("#admin-all-drivers-schedule-table").append(row);
                }
            }
        }, error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    });
}
$("#admin-all-drivers-schedule-table>tr").click(function () {

    let one = $(this).children(":eq(0)").text();
    console.log(one)
});
