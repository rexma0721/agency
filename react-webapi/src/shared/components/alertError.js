import swal from 'sweetalert';

// eslint-disable-next-line import/no-anonymous-default-export
export default (title, text) => {
    return swal({
        title : title,
        text : text,
        icon : 'error',
        buttons : false,
        timer : 3000
    }) ;
}