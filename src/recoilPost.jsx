import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'

const fireStatePost = atom({
    key: 'fireBoolPost', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export default fireStatePost

