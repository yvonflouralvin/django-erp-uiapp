import api from '../../network/api';

async function load(arg: {
    model: string,
    pagination?: boolean,
    page_size?: number,
    page_number?: number,
    columns?: string[]
    idIndex: string
}) {

    try {
        var params = ``;
        if (arg.pagination === true && arg.page_number !== undefined && arg.page_size !== undefined) params = `${params}?page_size=${arg.page_size}&page_number=${arg.page_number}`;
        if (arg.columns !== undefined) {
            if (params !== ``) params = `${params}&`
            else params = `${params}?`
            params = `${params}columns=${JSON.stringify([...arg.columns, arg.idIndex])}`
        }
        const result = await api.get(`/graphql/${arg.model}${params}`);
        return Promise.resolve(result.data)
    } catch (e) { 
        return Promise.reject(e)
    }
}

async function update(arg: {
    model: string,
    datas: any,
    condition: string
}) {

    try {
        const result = await api.put(`/graphql/${arg.model}`, {
            set_values: arg.datas,
            condition: arg.condition
        });
        return Promise.resolve(result.data);
    } catch (e) { 
        return Promise.reject(e)
    }
}


export default {
    load,
    update
}