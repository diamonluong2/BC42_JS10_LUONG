function Account(
    tk,
    name,
    email,
    password,
    dateOfBirth,
    salary,
    rank,
    time
) {
    this.tk = tk;
    this.name = name;
    this.email = email;
    this.password = password;
    this.dateOfBirth = dateOfBirth;
    this.salary = salary;
    this.rank = rank;
    this.time = time;

}

Account.prototype.calsalary = function (){
    let Sum;
    if (this.rank == "sep"){
        Sum = this.salary * 3;
    }else if(this.rank == "truongphong"){
        Sum = this.salary * 2;
    }else if(this.rank == "nhanvien"){
        Sum = this.salary
    }
    return Sum;
};

Account.prototype.sort = function (){
    let xeploai = "";
    if(this.time >= 192){
        xeploai = "Xuất sắc";
    }else if (this.time >=176){
        xeploai = "Giỏi";
    }else if (this.time >=160){
        xeploai = "Khá";
    }else{
        xeploai = "Trung bình";
    }
    return xeploai;
};