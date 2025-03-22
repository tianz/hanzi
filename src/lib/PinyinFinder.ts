import pinyinJson from './PinyinList.json';

export let finder = (input: string) => {
  if (input in pinyinJson) {
    return pinyinJson[input as keyof typeof pinyinJson];
  }
  return [];
};
