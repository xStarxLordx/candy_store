import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import React from 'react'

export function alerts(message, icon, focus=""){
    onfocus(focus)
    const MySwal = withReactContent(Swal)
    MySwal.fire({
        title: message,
        icon: icon
    })
}

function onfocus(focus){
    if(focus !== ""){
        document.getElementById(focus).focus();
    }
}
