import { PinyinList } from './PinyinList';

export let finder = (input: string) => {
  if (input in PinyinList) {
    return PinyinList[input];
  }
  return [];
};
