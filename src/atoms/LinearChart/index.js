import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';

import { optionHospital1, optionHospital2, optionHospital3 } from '../../Data/DoctorData'

const LinearChart = ({ selectedHospital }) => {
    // const [optionHospital1, setoptionHospital1] = useState([]);

    console.log("selectedHospital", selectedHospital)

    // useEffect(() => {
    //   asyncFetch();
    // }, []);

    // const asyncFetch = () => {
    //   fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
    //     .then((response) => response.json())
    //     .then((json) => setoptionHospital1(json))
    //     .catch((error) => {
    //       console.log('fetch optionHospital1 failed', error);
    //     });
    // };
    const config = {
        data: selectedHospital == 'Adan Hospital' ? optionHospital1 : selectedHospital == 'Al Jahra Hospital' ? optionHospital2 : selectedHospital == 'Al Sabah Hospital' ? optionHospital3 : optionHospital1,
        padding: 'auto',
        xField: 'Date',
        yField: 'Patients',
        xAxis: {
            tickCount: 5,
        },
        slider: {
            start: 0.1,
            end: 0.5,
        },
    };

    return <Line {...config} />;
}

export default LinearChart