export default class Api{
    constructor (url,metodo,parametros = null,token = null){
        this.url = url;
        this.metodo = metodo;
        this.parametros = parametros;
        this.token = token;
    }

    async call(){
        let init = null
        if (this.metodo === "GET") {
            init = {
                method:this.metodo,
                headers: {
                    "Accept": 'application/json',
                    "Authorization": `Baerer ${this.token}`
                }
            }
        }else{
            init = {
                method:this.metodo,
                body: JSON.stringify(this.parametros), 
                headers: {
                    "Accept": 'application/json',
                    "Authorization": `Baerer ${this.token}`
                }
            }
        }
        try{
            const response = await fetch(this.url,init)
            .then(res => {
                if ( res.status === 200) {
                    return res.json()
                } else if (res.status === 401) {
                    return {
                        response : false,
                        result : 401
                    };
                }else{
                    return res.text()
                }
            });
            return response;
        } catch (error) {
            return {
                response: false,
                result: [],
                message: error.message
            };
        }
    }
}