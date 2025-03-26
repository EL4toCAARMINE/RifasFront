export default class ApiFiles {
    
    constructor(url, metodo, params = null, token = null) {
        this.url = url;
        this.metodo = metodo;
        this.params = params;
        this.token = token;
    }
    async call() {
        let init = {
            method: this.metodo,
            body: this.params,
            headers: {
                "Accept": 'multipart/form-data',
                "Authorization": `Bearer ${this.token}`
            }
        }
        try {
            const response = await fetch(this.url, init)
                .then(res => {
                    if (res.status === 200) {
                        return res.json()
                    } else if (res.status === 401) {
                        return {
                            response: false,
                            result: 401,
                            message: "No autorizado"
                        };
                    } else if (response.status === 404) {
                        return {
                            response: false,
                            result: 404,
                            message: "Ha ocurrido un error inesperado",
                        };

                    } else {
                        return res.text();
                    }
                });
            return response;
        } catch (error) {
            // Capturar errores relacionados con la red o el backend
            if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                return {
                    response: false,
                    result: [],
                    message: "Error de conexión",
                };
            }

            return {
                response: false,
                result: [],
                message: "Ha ocurrido un error inesperado",
            };
        }
    }
}