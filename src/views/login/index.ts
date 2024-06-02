import { VueElement } from "vue";

type InfoType = {
    username: string;
    password: string;
    code: string;
    hash: string;
};

type RulesDesc = { required: boolean, trigger: string, message: string };
type RulesType = {
    username: RulesDesc[];
    password: RulesDesc[];
    code: RulesDesc[];
}

export {
    InfoType,
    RulesType
}