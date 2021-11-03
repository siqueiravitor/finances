
export function moneyFormat(value){
    value = parseFloat(value);
    value = value.toFixed(2)
    if(value > 999999){
        value = "+R$999999"
        return value;
    }
    value = value.replace('.',',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return value;
}

export function getData(data){
    let dia = (data.getDate() < 10) ? '0' + data.getDate() : data.getDate();
    let mes = (data.getMonth() < 9) ? '0' + (data.getMonth() + 1) : (data.getMonth() + 1);
    let ano = data.getFullYear()
    let date = `${ano}-${mes}-${dia}`
    return date.toString();
}
export function getDataBr(data){
    let dia = (data.getDate() < 10) ? '0' + data.getDate() : data.getDate();
    let mes = (data.getMonth() < 9) ? '0' + (data.getMonth() + 1) : (data.getMonth() + 1);
    let ano = data.getFullYear()
    let date = `${dia}/${mes}/${ano}`
    return date.toString();
}

export function getDataHoje() {
    let data = new Date();
    let mes = (data.getMonth() < 10) ? '0' + (data.getMonth() + 1) : (data.getMonth() + 1);
    let dia = (data.getDate() < 10) ? '0' + data.getDate() : data.getDate();
    let ano = data.getFullYear()
    let dataHoje = `${dia}/${mes}/${ano}`
    return dataHoje.toString();
}

export function getHoraHoje() {
    let data = new Date();
    let hora = (data.getHours().toString().length == 1 ? '0' + data.getHours() : data.getHours());
    let min = (data.getMinutes().toString().length == 1 ? '0' + data.getMinutes() : data.getMinutes());
    let seg = (data.getSeconds().toString().length == 1 ? '0' + data.getSeconds() : data.getSeconds());
    let horaAgora = hora + ':' + min + ':' + seg;
    return horaAgora.toString();
}


export function getDataHojeSeparador(separador) {
    let data = new Date();
    let mes = (data.getMonth() < 10) ? '0' + (data.getMonth() + 1) : (data.getMonth() + 1);
    let dia = (data.getDate() < 10) ? '0' + data.getDate() : data.getDate();
    let dataHoje = data.getFullYear() + separador + mes + separador + dia;
    return dataHoje.toString();
}

export function getHoraHojeSeparador() {
    let data = new Date();
    let hora = (data.getHours().toString().length == 1 ? '0' + data.getHours() : data.getHours());
    let min = (data.getMinutes().toString().length == 1 ? '0' + data.getMinutes() : data.getMinutes());
    let seg = (data.getSeconds().toString().length == 1 ? '0' + data.getSeconds() : data.getSeconds());
    let horaAgora = hora + ':' + min + ':' + seg;
    return horaAgora.toString();
}