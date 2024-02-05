// sweetalert2

export default {
  popupAlert(text, icon) {
    Swal.fire({
      icon,
      text,
      position: "center",
      toast: true,
      timer: 1500,
      showConfirmButton: false,
    });
  },
};
