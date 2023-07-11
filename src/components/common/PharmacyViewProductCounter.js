import React, { useState } from 'react';
import Sep from '../../assets/images/pharmacy/Sep.svg'
import Add from '../../assets/images/pharmacy/Add.svg'

const PharmacyViewProductCounter = ({ increBtn, decreBtn, inputField }) => {

    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        count > 0 ? setCount(count - 1) : setCount(0)
    };

    const handleInputChange = (event) => {
        const inputValue = Number(event.target.value);
        setCount(inputValue);
    };

    return (
        <>

            <div className='d-flex align-items-center'>
            <button className={`${decreBtn}`} onClick={handleDecrement}>
                <img src={Sep} alt="" />
            </button>

            <input className={`${inputField}`} value={count} onChange={handleInputChange} />

            <button className={`${increBtn}`} onClick={handleIncrement}>
                <img src={Add} alt="" />
            </button>
            </div>

        </>
    )
}

export default PharmacyViewProductCounter