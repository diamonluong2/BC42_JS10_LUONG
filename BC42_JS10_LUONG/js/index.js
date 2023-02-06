// Tạo mãng chứa tài khoản 
let listAccount = [];

function getElement(selector) {
    return document.querySelector(selector);
}

// Hàm để hiển thị danh sách sinh viên ra 
function showTable(listAccount){
    let html = listAccount.reduce((output, account)=>{
        return(
            output +
            `
            <tr>
                <td>${account.tk}</td>
                <td>${account.name}</td>
                <td>${account.email}</td>
                <td>${account.dateOfBirth}</td>
                <td>${account.rank}</td>
                <td>${account.calsalary()}</td>
                <td>${account.sort()}</td>
                <td>
                    <button
                    class="btn btn-primary"
                    onclick="selectAccountToUpdate('${account.tk}')"
                    >
                        Chỉnh sửa
                    </button>
                    <button
                    class="btn btn-danger"
                    onclick="deleteNV('${account.tk}')"
                    >
                        Xóa
                    </button>
                </td>
            </tr>
            `
        );
    },"");

    getElement("#tableDanhSach").innerHTML = html;
}

// Hàm thêm tài khoản
function createAccount(){
    let tk = getElement("#tknv").value;
    let name = getElement("#name").value;
    let email = getElement("#email").value;
    let password = getElement("#password").value;
    let dateOfBirth = getElement("#datepicker").value;
    let salary = getElement("#luongCB").value;
    let rank = getElement("#chucvu").value; 
    let time = +getElement("#gioLam").value;

    // Khởi tạo object danh sách tài khoản 
    let account = new Account(
        tk,
        name,
        email,
        password,
        dateOfBirth,
        salary,
        rank,
        time
    );

    // Thêm Object vào mảng listaccount
    listAccount.push(account);

    // Gọi hàm renderTable để hiển thị danh sách listAccount ra table 
    showTable(listAccount);
}

function validate(){
    // Mặc định là form hợp lệ 
    let isValid = true;
     
    // Kiểm tra tài khoản 
    let tk = getElement("#tknv").value;
    if (!tk.trim()){
        isValid = false;
        getElement("#tbTKNV").innerHTML = "Tài khoản không được để khoản trống";
    }else if(
        !/^[A-Za-z0-9]{4,6}$/.test(tk)
    ){
        isValid = false;
        getElement("#tbTKNV").innerHTML = "Tài khoản không hợp lệ";
    }else{
        getElement("#tbTKNV").innerHTML = "";
    }

    // Kiểm tra tên nhân viên 
    let name = getElement("#name").value;
    if (!name.trim()){
        isValid = false;
        getElement("#tbTen").innerHTML = "Tên nhân viên không được để khoản trống";
    }else if(
        !/^[a-zA-Z]+$/.test(name)
    ){
        isValid = false;
        getElement("#tbTen").innerHTML = "Tên nhân viên không hợp lệ";
    }else{
        getElement("#tbTen").innerHTML = "";
    }

    // Kiểm tra email
    let email = getElement("#email").value;
    if (!email.trim()){
        isValid = false;
        getElement("#tbEmail").innerHTML = "Email không được để khoản trống";
    }else if(
        !/^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)
    ){
        isValid = false;
        getElement("#tbEmail").innerHTML = "Email không hợp lệ";
    }else{
        getElement("#tbEmail").innerHTML = "";
    }

    // Kiểm tra mật khẩu
    let mk = getElement("#password").value;
    if (!mk.trim()){
        isValid = false;
        getElement("#tbMatkhau").innerHTML = "Mật khẩu không được để khoản trống";
    }else if(
        !/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,10})/.test(mk)
    ){
        isValid = false;
        getElement("#tbMatkhau").innerHTML = "Mật khẩu không hợp lệ";
    }else{
        getElement("#tbMatkhau").innerHTML = "";
    }

    // Kiểm tra ngày 
    let date = getElement("#datepicker").value;
    if (!date.trim()){
        isValid = false;
        getElement("#tbNgay").innerHTML = "Ngày không được để khoản trống";
    }else if(
        !/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/.test(date)
    ){
        isValid = false;
        getElement("#tbNgay").innerHTML = "Ngày không hợp lệ";
    }else{
        getElement("#tbNgay").innerHTML = "";
    }

    // Lương cơ bản 
    let salary = getElement("#luongCB").value;
    if (!salary.trim()){
        isValid = false;
        getElement("#tbLuongCB").innerHTML = "Lương cơ bản không được để khoản trống";
    }else if( salary < 1000000 && salary > 20000000){
        isValid = false;
        getElement("#tbLuongCB").innerHTML = "Lương cơ bản không hợp lệ";
    }else{
        getElement("#tbLuongCB").innerHTML = "";
    }

    // Số giờ làm việc 
    let hours = getElement("#gioLam").value;
    if (!hours.trim()){
        isValid = false;
        getElement("#tbGiolam").innerHTML = "Số giờ không được để khoản trống";
    }else if(
        !/(8[0-9]|9[0-9]|1[0-9]{2}|200)/.test(hours)
    ){
        isValid = false;
        getElement("#tbGiolam").innerHTML = "Số giờ không hợp lệ";
    }else{
        getElement("#tbGiolam").innerHTML = "";
    }

    return isValid;
}

// Hàm xóa nhân viên theo tài khoản 
function deleteNV(accountId){
    listAccount = listAccount.filter((account)=>{
        return account.tk !== accountId;
    });

    showTable(listAccount);

}

// Hàm để lọc loại nhân viên 
function selectAccountToUpdate(accountId){
    let selectedAccount = listAccount.find((account)=>{
        return account.tk === accountId;

    });

    // Lấy thông tin của sinh viên tìm được để fill lên form 
    getElement("#tknv").value = selectedAccount.tk;
    getElement("#name").value = selectedAccount.name;
    getElement("#email").value = selectedAccount.email;
    getElement("#password").value = selectedAccount.mk;
    getElement("#datepicker").value = selectedAccount.dateOfBirth;
    getElement("#luongCB").value = selectedAccount.salary;
    getElement("#chucvu").value = selectedAccount.rank; 
    getElement("#gioLam").value = selectedAccount.time;
  
}

// Hàm cập nhật thông tin sinh viên 
function updateAccount(){
    let tk = getElement("#tknv").value;
    let name = getElement("#name").value;
    let email = getElement("#email").value;
    let password = getElement("#password").value;
    let dateOfBirth = getElement("#datepicker").value;
    let salary = getElement("#luongCB").value;
    let rank = getElement("#chucvu").value; 
    let time = +getElement("#gioLam").value;

    let isValid = validate();
    if (!isValid) {
        return;
    }

    let account = new Account(
        tk,
        name,
        email,
        password,
        dateOfBirth,
        salary,
        rank,
        time
    );

    let index = listAccount.findIndex((account)=>{
        return account.tk = tk;
    });
    listAccount[index] = account;
    showTable(listAccount);
}

function searchNV() {
    // B1: DOM
    let search = getElement("#searchName").value;
  
    // B2: Lọc những student có name khớp với giá trị search
    let newStudentList = listAccount.filter((account) => {
      let xeploai = account.sort().toLowerCase();
      search = search.toLowerCase();
  
      return xeploai.indexOf(search) !== -1;
    });
  
    // B3: Gọi hàm renderTable để hiển thị ra giao diện
    showTable(newStudentList);
}
  