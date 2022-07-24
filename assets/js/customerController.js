
$('#register-form-date').val(today);
$('#customer-home-pickup').val(today);
$('#customer-home-return').val(today);


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
