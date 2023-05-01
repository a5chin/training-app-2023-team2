import { useEffect, useState } from 'react';

import { APIService } from '../../shared/services';
import { Hello } from '../../shared/models';

export function HelloWorld() {
    const [hello, setHello] = useState<Hello>();
    useEffect(() => {
        const getHelloText = async () => {
            const h = await APIService.getHello();
            setHello(h);
        };
        getHelloText();
    }, []);

    return (
        <div>
            <p>TEXT: {hello && hello?.message}</p>
            <p>LANG: {hello && hello?.lang}</p>
        </div>
    );
}
