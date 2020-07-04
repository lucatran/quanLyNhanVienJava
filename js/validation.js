function Validation() {
    // kiểm tra mã trống
    this.kiemTraMaTrong = function (inputVal, spanID, message) {
        if (inputVal === "") {
            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
        document.getElementById(spanID).style.display = "none";
        document.getElementById(spanID).innerHTML = "";
        return true;
    },

        //kiểm tra mã trùng
        this.kiemTraMaTrung = function (inputVal, spanID, message, mangNV) {
            var check = mangNV.some(function (items) {
                return inputVal === items.maNhanVien
            });

            if (check) {
                document.getElementById(spanID).style.display = "block";
                document.getElementById(spanID).innerHTML = message;
                return false;
            }
            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = "";
            return true;
        },
        //kiểm tra ký tự
        this.kiemTraKyTu = function (inputVal, spanID, message) {
            var pattern = new RegExp(
                "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
            );
            if (pattern.test(inputVal)) {
                document.getElementById(spanID).style.display = "none";
                document.getElementById(spanID).innerHTML = "";
                return true;
            }
            //khong hop le
            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false;
        },
        this.kiemTraEmail = function (inputVal, spanID, message) {
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            //hop le
            if (inputVal.match(mailformat)) {
                document.getElementById(spanID).style.display = "none";
                document.getElementById(spanID).innerHTML = "";
                return true;
            }

            //khong hop le
            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false;
        },
        this.kiemTraDoDai = function (inputVal, spanID, message, min, max) {

            //hop le
            if (inputVal.length >= min && inputVal.length <= max) {
                document.getElementById(spanID).style.display = "none";
                document.getElementById(spanID).innerHTML = "";
                return true;
            }

            //khong hop le
            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false;
        },

        //kiem tra chức vụ
        this.kiemTraChucVu = function(selectID, spanID, message){

            if(document.getElementById(selectID).selectedIndex !==0){

            document.getElementById(spanID).style.display = "none";
                document.getElementById(spanID).innerHTML = "";
                return true;      
            }
            //khong hop le
            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
}