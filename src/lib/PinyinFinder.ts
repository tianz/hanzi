import './PinyinList';
import { PinyinList } from './PinyinList';

export let finder = (input: string) => {
    if (input in PinyinList) {
        console.log(PinyinList[input]);
        return PinyinList[input];
    }
};
