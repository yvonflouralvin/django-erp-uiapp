import { AppConfig } from "../types/config";


const load_addon = async (addon: string): Promise<AppConfig> => {
    const res = await import(addon);
    return Promise.resolve(res);
}

export default {
    load_addon
}