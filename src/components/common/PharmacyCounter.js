import React, { useState } from 'react'

import Sep from '../../assets/images/pharmacy/Sep.svg'
import Add from '../../assets/images/pharmacy/Add.svg'

const PharmacyCounter = () => {

    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        count > 0 ? setCount(count - 1) : setCount(0)
    };

    return (
        <>

            <div className="d-flex align-items-center justify-content-center">

                <span className='pharmacy-counter-btn d-flex align-items-center justify-content-center' onClick={handleDecrement}>
                    <img src={Sep} alt="" />
                </span>
                <span className=' mx-1 pharmacy-counter-text d-flex align-items-center justify-content-center' >
                    <span>{count}</span>
                </span>

                <span className='pharmacy-counter-btn d-flex align-items-center justify-content-center' onClick={handleIncrement}>
                    <img className='pharmacy-counter-btn-add' src={Add} alt="" />
                </span>

            </div>

        </>
    )
}

export default PharmacyCounter