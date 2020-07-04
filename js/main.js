/*
  Quản lý nhân viên:
  - Thêm nhân viên
  - Xoá nhân viên
  - Cập nhật thông tin nhân viên
  - Tìm kiếm nhân viên
  - Local Storage
*/


mangNhanVien = [];
var validation = new Validation();

function themNhanVien() {
  var maNV = document.getElementById("msnv").value;
  var tenNV = document.getElementById("name").value;
  var matKhau = document.getElementById("password").value;
  var mail = document.getElementById("email").value;
  var ngayLam = document.getElementById("datepicker").value;
  var chucVu = document.getElementById("chucvu").value;

  var isValid = true;

  //Kiem tra du lieu
  //Ma nhan vien: kiem tra rong và kiem tra ma trùng
  isValid &= validation.kiemTraMaTrong(maNV, "tbMaNV", "Ma nhan vien khong de trong") && validation.kiemTraMaTrung(maNV, "tbMaNV", "Ma nhan vien da ton tai", mangNhanVien);

  //Ho ten : kiem tra rong và kiem tra ky tu
  isValid &= validation.kiemTraMaTrong(tenNV, "tbTen", "Ten nhan vien khong de trong") && validation.kiemTraKyTu(tenNV, "tbTen", "Ho ten khong hop le");

  //email: kiem tra rong và kiem tra hop le cho email
  isValid &= validation.kiemTraMaTrong(mail, "tbEmail", "Email khong de trong") && validation.kiemTraEmail(mail, "tbEmail", "Email khong hop le");

  //password: kiem tra rong và kiem tra do dai
  isValid &= validation.kiemTraMaTrong(matKhau, "tbMatKhau", "Password khong de trong") && validation.kiemTraDoDai(matKhau, "tbMatKhau", "Mat khau phai dai tu 6 den 16 ky tu", 6, 16);

  //chuc vu: kiem tra khong lay gia tri dau tien
  isValid &= validation.kiemTraChucVu("chucvu", "tbChucVu", "Chuc vu chua duoc chon");

  console.log(isValid);

  if (isValid) {
    var nhanVien = new NhanVien(maNV, tenNV, matKhau, mail, ngayLam, chucVu);
    nhanVien.tinhTongLuong();
    mangNhanVien.push(nhanVien);
    LuuLS();
    HienThi(mangNhanVien);
  }
}

function HienThi(mangHienThi) {
  var content = "";
  for (var i = 0; i < mangHienThi.length; i++) {
    var nhanVien = mangHienThi[i];
    content +=
      `<tr>
        <td>${nhanVien.maNhanVien}</td>
        <td>${nhanVien.tenNhanVien}</td>
        <td>${nhanVien.mail}</td>
        <td>${nhanVien.ngayLam}</td>
        <td>${nhanVien.chucVu}</td>
        <td>${nhanVien.tongLuong}</td>
        <td><button class="btn btn-danger" data-id="${nhanVien.maNhanVien}" onclick="XoaNhanVien(event)">Xóa</button>
        <button class="btn btn-success" data-id="${nhanVien.maNhanVien}" data-toggle="modal" data-target="#myModal" onclick="LoadThongTinNV(event)">Sửa</button>
        </td>
         </tr>
        `
    var tableDanhSach = document.getElementById("tableDanhSach");
    tableDanhSach.innerHTML = content;
  }
}
//lưu vào Local Storage

function LuuLS() {
  var jsonData = JSON.stringify(mangNhanVien);//phương thức bị loại bỏ chỉ còn thuộc tính
  localStorage.setItem("DSNV", jsonData);// luu vao storage và đặt tên;
}
//lấy Local storage

function LayLS() {
  var jsonData = localStorage.getItem("DSNV");
  // nếu local có giá trị
  if (jsonData !== null) {
    //chuyển về kiểu dữ liệu có sẵn
    mangNhanVien = JSON.parse(jsonData);
    HienThi(mangNhanVien);
  }
}

//XÓA 
// lấy id nhân viên cần xóa
// kiểm tra id có trong mãng 
// Xoá. splice(start, deleteCount)

function TimViTri(id) {
  for (var i = 0; i < mangNhanVien.length; i++) {
    if (mangNhanVien[i].maNhanVien === id) {
      return i;
    }
  }
  return -1;
}

function XoaNhanVien(e) {
  var btn = e.target;
  // <input class="" style="color: red"/>
  var id = btn.getAttribute("data-id");
  var index = TimViTri(id);
  mangNhanVien.splice(index, 1);
  LuuLS();
  HienThi(mangNhanVien);
}
LayLS();


//SỬA
// B1 LẤY MÃ NHAN VIÊN
// B2 XEM MÃ NHAN VIEN CÓ TRONG MANG 
// B3 LUU LEN MODAL
function LoadThongTinNV(e) {
  var btn = e.target;
  var id = btn.getAttribute("data-id");
  var index = TimViTri(id);
  var nhanVien = mangNhanVien[index];

  document.getElementById("msnv").value = nhanVien.maNhanVien;
  document.getElementById("name").value = nhanVien.tenNhanVien;
  document.getElementById("password").value = nhanVien.matKhau;
  document.getElementById("email").value = nhanVien.mail;
  document.getElementById("datepicker").value = nhanVien.ngayLam;
  document.getElementById("chucvu").value = nhanVien.chucVu;

  document.getElementById("msnv").disabled = true;
  document.getElementById("btnThemNV").style.display = "none";
  document.getElementById("btnCapNhat").style.display = "block";

}

// B4 CHO NGUOI DUNG SUA THONG TIN
function CapNhat() {
  var maNV = document.getElementById("msnv").value;
  var tenNV = document.getElementById("name").value;
  var matKhau = document.getElementById("password").value;
  var mail = document.getElementById("email").value;
  var ngayLam = document.getElementById("datepicker").value;
  var chucVu = document.getElementById("chucvu").value;
  // B5 LƯU VÀO MẢNG MỚI
  var nhanVienMoi = new NhanVien(maNV, tenNV, matKhau, mail, ngayLam, chucVu);
  nhanVienMoi.tinhTongLuong();
  var index = TimViTri(maNV);
  mangNhanVien[index] = nhanVienMoi;
  HienThi(mangNhanVien);
}

// tìm kiếm


function TimKiemNhanVien(){
  var mangTimNV = [];
var keyword = document.getElementById("searchName").value;

for(var i = 0 ; i < mangNhanVien.length; i++){
  var nhanVien = mangNhanVien[i];
keyword = keyword.toLowerCase().replace(/\s/g, '');
if(nhanVien.tenNhanVien.toLowerCase().replace(/\s/g, '').indexOf(keyword) !== -1){
mangTimNV.push(mangNhanVien[i]);}
}
if(mangTimNV.length !== 0 ){
  HienThi(mangTimNV);
}else{
  alert("Không tìm thấy")
}
}


//gọi hàm in len html
var btnThemNV = document.getElementById("btnThemNV");
btnThemNV.addEventListener('click', themNhanVien);
var btnThem = document.getElementById("btnThem");
btnThem.addEventListener('click', function () {
  document.getElementById("msnv").disabled = false;
  document.getElementById("btnCapNhat").style.display = "none";
  document.getElementById("btnThemNV").style.display = "block";
});

var btnCapNhat = document.getElementById("btnCapNhat");
btnCapNhat.addEventListener('click', CapNhat);


var btnTimNV = document.getElementById("btnTimNV");
btnTimNV.addEventListener('click',TimKiemNhanVien)

var inputSeachName = document.getElementById("searchName");
inputSeachName.addEventListener('keyup', function(e){
  if(e.keyCode === 13){
    TimKiemNhanVien();
  };
})