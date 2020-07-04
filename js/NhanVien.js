// tạo lớp nhân viên function

function NhanVien(_maNV,_tenNV,_matKhau,_mail,_ngayLam,_chucVu) {
this.maNhanVien = _maNV;
this.tenNhanVien = _tenNV;
this.matKhau = _matKhau;
this.mail =_mail;
this.ngayLam = _ngayLam;
this.chucVu = _chucVu;
this.luongCoBan = 400;
this.tongLuong = 0;


this.tinhTongLuong = function () {
    if (this.chucVu === "Sếp") {
      this.tongLuong = this.luongCoBan * 3;
    } else if (this.chucVu === "Trưởng phòng") {
      this.tongLuong = this.luongCoBan * 2;
    } else if (this.chucVu === "Nhân viên") {
      this.tongLuong = this.luongCoBan;
    }
  }

}

