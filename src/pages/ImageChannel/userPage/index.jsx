import { Button } from 'antd';
import React from 'react';
import useLocalStorageState from '../../../hooks/useLocalStorage';

export function UserPage() {
    const [test,setTest] = useLocalStorageState('test', 1)
    console.log(test)
    return (
        <>
            <p>{test}</p>
            <Button onClick={() => {setTest(test + 1)}}>click</Button>
        </>
    );
}