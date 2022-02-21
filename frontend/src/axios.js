
import axios from "axios";

const send = async (url,method,data,callback) =>{

    await axios({
        url : url,
        method : method,
        data : data,
    }).then(resp => {
        callback(resp);
    }).catch(err => {
        console.log(err);
    });

}

export default send;