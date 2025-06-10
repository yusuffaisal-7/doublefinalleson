import Swal from 'sweetalert2';

const CustomAlert = {
  success: (title, text = '') => {
    return Swal.fire({
      title,
      text,
      icon: 'success',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        popup: 'rounded-xl border border-[#70C5D7]/20',
        title: 'text-[#005482] font-bold',
        content: 'text-[#005482]',
        confirmButton: 'bg-[#DA3A60] hover:bg-[#DA3A60]/90 text-white rounded-lg px-6 py-2.5',
      },
      background: '#FFFFFF',
    });
  },

  error: (title, text = '') => {
    return Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonText: 'OK',
      customClass: {
        popup: 'rounded-xl border border-[#DA3A60]/20',
        title: 'text-[#DA3A60] font-bold',
        content: 'text-[#005482]',
        confirmButton: 'bg-[#DA3A60] hover:bg-[#DA3A60]/90 text-white rounded-lg px-6 py-2.5',
      },
      background: '#FFFFFF',
    });
  },

  warning: (title, text = '', showCancelButton = false) => {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass: {
        popup: 'rounded-xl border border-[#FCBB45]/20',
        title: 'text-[#FCBB45] font-bold',
        content: 'text-[#005482]',
        confirmButton: 'bg-[#DA3A60] hover:bg-[#DA3A60]/90 text-white rounded-lg px-6 py-2.5',
        cancelButton: 'bg-[#70C5D7] hover:bg-[#70C5D7]/90 text-white rounded-lg px-6 py-2.5',
      },
      background: '#FFFFFF',
    });
  },

  info: (title, text = '') => {
    return Swal.fire({
      title,
      text,
      icon: 'info',
      confirmButtonText: 'OK',
      customClass: {
        popup: 'rounded-xl border border-[#70C5D7]/20',
        title: 'text-[#70C5D7] font-bold',
        content: 'text-[#005482]',
        confirmButton: 'bg-[#005482] hover:bg-[#005482]/90 text-white rounded-lg px-6 py-2.5',
      },
      background: '#FFFFFF',
    });
  },

  confirm: (title, text = '') => {
    return Swal.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass: {
        popup: 'rounded-xl border border-[#70C5D7]/20',
        title: 'text-[#005482] font-bold',
        content: 'text-[#005482]',
        confirmButton: 'bg-[#DA3A60] hover:bg-[#DA3A60]/90 text-white rounded-lg px-6 py-2.5',
        cancelButton: 'bg-[#70C5D7] hover:bg-[#70C5D7]/90 text-white rounded-lg px-6 py-2.5',
      },
      background: '#FFFFFF',
    });
  },
};

export default CustomAlert; 