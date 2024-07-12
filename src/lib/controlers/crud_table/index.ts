import functions from "./functions"




const useCrudTable = () => {

    const load = async (arg: {
        model: string,
        pagination?: boolean,
        page_size?: number,
        page_number?: number
        idIndex: string
    }) => {
        try {
            const result = await functions.load(arg);
            return Promise.resolve(result)
        } catch (e) {
            return Promise.resolve([])
        }
    }

    const updateItem = async (arg:{
        model: string,
        datas: any,
        condition: string
    })=>{
        try{
            const result = await functions.update(arg);
            return Promise.resolve(result);
        }catch(e){
            return Promise.reject(e)
        }
    }

    return {
        load,
        updateItem
    }
}


export default useCrudTable;