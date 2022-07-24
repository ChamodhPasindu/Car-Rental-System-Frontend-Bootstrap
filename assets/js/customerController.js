$('#register-form-date').val(today);
$('#customer-home-pickup').val(today);
$('#customer-home-return').val(today);
var customer;


$("#registerNowBtn").click(function () {

    registerCustomer()
})


function registerCustomer() {
    var data = new FormData();

    let nic = $("#register-form-NIC-image")[0].files[0];
    let nicFileName = nic.name;
    let license = $("#register-form-License-image")[0].files[0];
    let licenseFileName = license.name;

    data.append("file", nic);
    data.append("file", license);

    let customerDTO = {
        nic: $("#register-form-nic").val(),
        user_name: $("#register-form-user-name").val(),
        password: $("#register-form-password").val(),
        customer_name: $("#register-form-name").val(),
        address: $("#register-form-address").val(),
        mobile: $("#register-form-mobile").val(),
        email: $("#register-form-email").val(),
        register_date: $("#register-form-date").val(),
        nic_img: nicFileName,
        license_img: licenseFileName,
    }
    data.append("customer", new Blob([JSON.stringify(customerDTO)], {type: "application/json"}));

    console.log($("#register-form-date").val())

    $.ajax({
        url: baseUrl + "controller/customer/register",
        method: 'post',
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: function (resp) {
            console.log(resp.data)
            alert(resp.message);
            if (!(resp.data == null)) {
                openCustomerHome(resp.data)
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function openCustomerHome(data) {
    $("#registerForm").css("display", "none")

    $("#customer").css("display", "block")
    $("#customerNavbar").css("display", "block")

    $("#customer-profile-nic").val(data.nic)
    $("#customer-profile-name").val(data.user_name)
    $("#customer-profile-email").val(data.email)
    $("#customer-profile-address").val(data.address)
    $("#customer-profile-mobile").val(data.mobile)
}


function loadAllCustomer() {
    $("#admin-customer-table").empty();

    $.ajax({
        url: baseUrl + "controller/customer/allCustomerDetail",
        method: "GET",
        success: function (resp) {
            for (const customer of resp.data) {
                let row = `<tr><td>${customer.nic}</td><td>${customer.user_name}</td><td>${customer.address}</td><td>${customer.mobile}</td>
                <td>${customer.register_date}</td></tr>`;
                $("#admin-customer-table").append(row);
            }
        }
    });
}


$("#btnChangePassword").click(function () {


    var newPassword = $("#customer-profile-new-password").val()

    let userDTO = {
        user_name: customer.user_name,
        password:   $("#customer-profile-current-password").val(),
    }

    $.ajax({
        url: baseUrl+"controller/login",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(userDTO),
        success: function (res) {
            if (res.status === 200) {
                if (res.message === ("Customer")) {
                    changePassword(customer.nic, customer.user_name, newPassword);
                } else {
                    alert("Current Password Didnt match")
                }
            }
        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    });
})

function changePassword(nic, user_name, newPassword) {
    user = {
        customer_id: nic,
        user_name: user_name,
        password: newPassword
    }
    console.log(user)

    $.ajax({
        url: baseUrl+"controller/customer/accountSecurity",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(user),
        success: function (res) {
            if (res.status === 200) {
                alert(res.message)
            } else {
                alert("Cant update your password in this moment")
            }
        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    });
}

$("#customer-updateBtn").click(function (){

    var newDetails={
        nic:$("#customer-profile-nic").val(),
        user_name:customer.user_name,
        password:customer.password,
        customer_name:$("#customer-profile-name").val(),
        license_img:customer.license_img,
        nic_img:customer.nic,
        address:$("#customer-profile-address").val(),
        mobile:$("#customer-profile-mobile").val(),
        email:$("#customer-profile-email").val(),
        register_date:customer.register_date
    }
    console.log(newDetails)

    $.ajax({
        url: baseUrl+"controller/customer/update",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(newDetails),
        success: function (res) {
            if (res.status === 200) {
                alert(res.message)
            } else {
                alert("Cant update your password in this moment")
            }
        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    });
})
