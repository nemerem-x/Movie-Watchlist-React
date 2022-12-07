import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'

const fireState = atom({
    key: 'fireBool', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

const fireStatePost = atom({
    key: 'firePostBool', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export {fireState, fireStatePost}

