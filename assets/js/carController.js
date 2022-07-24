
$("#btnCarSave").click(function () {
    saveCar()
})
$("#admin-car-available").click(function () {
    $("#unavailableBtn").css("display","block");

    $("#maintainBtn").css("display","none");
    $("#underMaintainBtn").css("display","none");
    $("#availableBtn").css("display","none");
    $("#viewButton").css("display","none");

    $("#admin-all-cars-title").css("display","none");
    $("#admin-all-unavailableCars-title").css("display","none");
    $("#admin-all-needMaintains-title").css("display","none");
    $("#admin-all-underMaintains-title").css("display","none");
    $("#admin-all-availableCars-title").css("display","block");



    loadAllCars("unavailableOrAvailableCarsByStatus/Available")


})
$("#admin-car-unavailable").click(function () {
    $("#availableBtn").css("display","block");

    $("#unavailableBtn").css("display","none");
    $("#maintainBtn").css("display","none");
    $("#underMaintainBtn").css("display","none");
    $("#viewButton").css("display","none");

    $("#admin-all-cars-title").css("display","none");
    $("#admin-all-unavailableCars-title").css("display","block");
    $("#admin-all-needMaintains-title").css("display","none");
    $("#admin-all-underMaintains-title").css("display","none");
    $("#admin-all-availableCars-title").css("display","none");


    loadAllCars("unavailableOrAvailableCarsByStatus/Unavailable")

})
$("#admin-car-underMaintain").click(function () {
    $("#availableBtn").css("display","block");

    $("#unavailableBtn").css("display","none");
    $("#maintainBtn").css("display","none");
    $("#underMaintainBtn").css("display","none");
    $("#viewButton").css("display","none");

    $("#admin-all-cars-title").css("display","none");
    $("#admin-all-unavailableCars-title").css("display","none");
    $("#admin-all-needMaintains-title").css("display","none");
    $("#admin-all-underMaintains-title").css("display","block");
    $("#admin-all-availableCars-title").css("display","none");


    loadAllCars("carsUnderMaintain")

})

$("#admin-car-needMaintain").click(function () {
    $("#maintainBtn").css("display","block");

    $("#availableBtn").css("display","none");
    $("#unavailableBtn").css("display","none");
    $("#underMaintainBtn").css("display","none");
    $("#viewButton").css("display","none");

    $("#admin-all-cars-title").css("display","none");
    $("#admin-all-unavailableCars-title").css("display","none");
    $("#admin-all-needMaintains-title").css("display","block");
    $("#admin-all-underMaintains-title").css("display","none");
    $("#admin-all-availableCars-title").css("display","none");


    loadAllCars("carsUnderMaintain")
})

function saveCar() {
    var data = new FormData();

    let front = $("#save-car-frontView")[0].files[0];
    let frontFileName = front.name;

    let back = $("#save-car-backView")[0].files[0];
    let backFileName = back.name;

    let side = $("#save-car-sideView")[0].files[0];
    let sideFileName = side.name;

    let interior = $("#save-car-interior")[0].files[0];
    let interiorFileName = interior.name;

    data.append("file", front);
    data.append("file", back);
    data.append("file", side);
    data.append("file", interior);


    var carImgDetailDTO = {
        image_1: frontFileName,
        image_2: backFileName,
        image_3: sideFileName,
        image_4: interiorFileName,
    }

    var carDTO = {
        registration_no: $("#save-car-registration-no").val(),
        brand: $("#save-car-brand").val(),
        type: $("#save-car-type").val(),
        transmission: $("#save-car-transmission").val(),
        color: $("#save-car-color").val(),
        no_of_passengers: $("#save-car-passengers").val(),
        mileage: $("#save-car-mileage").val(),
        fuel_type: $("#save-car-fuelType").val(),
        daily_rate: $("#save-car-daily").val(),
        monthly_rate: $("#save-car-monthly").val(),
        free_km_for_day: $("#save-car-freeKm-day").val(),
        free_km_for_month: $("#save-car-freeKm-month").val(),
        price_for_extra_km: $("#save-car-extraKm-price").val(),
        waiver_payment: $("#save-car-waiver-payment").val(),
        status: $("#save-car-status").val(),
        carImgDetail: carImgDetailDTO,
    }

    data.append("car", new Blob([JSON.stringify(carDTO)], {type: "application/json"}));


    console.log(carDTO)

    $.ajax({
        url: baseUrl + "controller/car/addNewCar",
        method: 'post',
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: function (resp) {
            if (resp.status === 200) {
                alert(resp.message);

            }
        },
        error: function (err) {
            console.log(err);
        }
    });


}

function loadAllCars(path) {
    $("#admin-cars-table").empty();

    $.ajax({
        url: baseUrl + "controller/car/"+path,
        method: "GET",
        success: function (resp) {
            for (const car of resp.data) {
                let row = `<tr><td>${car.registration_no}</td><td>${car.brand}</td><td>${car.type}</td><td>${car.transmission}</td><td>${car.fuel_type}</td></tr>`;
                $("#admin-cars-table").append(row);
            }
        }
    });
}


function loadUpcomingReservation() {
    $.ajax({
        url: baseUrl + "controller/customer/customerReservationByStatus/?id="+customer.nic+"&status=Accept",
        method: "GET",
        success: function (resp) {
           if (resp.status===200){
               if (!(resp.data.length === 0)){
                   setReservationData(resp.data);
                   loadDriverInfo()

               }
           }
        },
        error: function (err) {
            console.log(err);
        }
    });
}


function loadDriverInfo() {
    $.ajax({
        url: baseUrl + "controller/customer/sendDriverInfoForAcceptReservations/"+customer.nic,
        method: "GET",
        success: function (resp) {
            if (resp.status===200){
                if (!(resp.data.length === 0)){
                    setDriverData(resp.data);
                }
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}
function setReservationData(data) {
    $("#customer-reservationStatus").text("ACTIVE")
    $("#customer-reservationStatus").css("color","green")

    $("#customer-reservation-id").text(data[0].reserve_id)
    $("#customer-reservation-name").text(data[0].customer.customer_name)
    $("#customer-reservation-vehicle").text(data[0].car.registration_no)
    $("#customer-reservation-venue").text(data[0].pick_up_and_return_venue)
    $("#customer-reservation-pickUp-time").text(data[0].pick_up_time)
    $("#customer-reservation-pickUp-date").text(data[0].pick_up_date)
    $("#customer-reservation-return-date").text(data[0].return_date)
    $("#customer-reservation-days").text(data[0].no_of_days)

}
function setDriverData(data) {

    let reserveId = $("#customer-reservation-id").text();
    let id = data[0].carReservation.reserve_id;

    if (id===reserveId){

        $("#driverStatus").text("YES")
        $("#customer-reservationStatus").css("color","green")

        $("#customer-reservation-driver-id").text(data[0].driver.nic)
        $("#customer-reservation-driver-name").text(data[0].driver.driver_name)
        $("#customer-reservation-driver-license").text(data[0].driver.license_no)
        $("#customer-reservation-driver-mobile").text(data[0].driver.mobile)
        $("#customer-reservation-driver-joinDate").text(data[0].driver.join_date)
    }

}

