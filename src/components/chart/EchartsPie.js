import React from 'react';
import ReactEcharts from 'echarts-for-react';

const option = {
    title : {
        text: '业主男女比例',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : 'left',
        data:['男','女']
    },
    series : [
        {
            name:'业主',
            type:'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'男'},
                {value:310, name:'女'}
            ]
        }
    ]
};
const EchartsPie = () => (
    <ReactEcharts
        option={option}
        style={{height: '212px', width: '100%'}}
        className={'react_for_echarts'}
    />
);

export default EchartsPie