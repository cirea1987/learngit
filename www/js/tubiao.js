function tubiao(tubiao1,tubiao2,tubiao3,tubiao4){
    console.log(tubiao3)

    var domBar1 = document.getElementById("bar1");
    var myChart1 = echarts.init(domBar1);
    
    option1 = {
        title : {
            // text: '项目状态统计',
           
        },
        grid:{
            x:35,
            y:10,
            x2:30,
            y2:30
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data:['个数']
        },
        xAxis: [
            {
                type: 'category',
                data: ['审核中','审核通过','审核未过'],
                axisPointer: {
                    type: 'shadow'
                },
                // axisLabel: {
                //     show: true,
                //     textStyle: {
                //         color: '#fff',
                //         fontSize:'16'
                //     }
                //  }
             }
        ],
        yAxis: [
            {
                type: 'value',
                min: 0,
                interval: 50,
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [
            {
                color:'#DDA490',
                type:'bar',
                data:tubiao1
            }
        ]
    };
    
    if (option1 && typeof option1 === "object") {
        myChart1.setOption(option1, true);
    }
    
    
    var domBar2 = document.getElementById("bar2");
    var myChart2 = echarts.init(domBar2);
    
    option2 = {
        grid:{
            x:35,
            y:10,
            x2:25,
            y2:25
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data:['项目（个数）']
        },
        xAxis: [
            {
                type: 'category',
                data: ['中文','英文','德文','韩文','日文'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                
                min: 0,
                //max: 30,
                interval: 10,
                axisLabel: {
                    formatter: '{value}个'
                }
            }
        ],
        series: [
            {
                
                color:'#FCE9A4',
                type:'bar',
                data:tubiao2
            }
        ]
    };
    
    if (option2 && typeof option2 === "object") {
        myChart2.setOption(option2, true);
    }
    
    
    var domBar3 = document.getElementById("bar3");
    var myChart3 = echarts.init(domBar3);
    
    option3 = {
        grid:{
            x:30,
            y:10,
            x2:15,
            y2:35
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data:['项目']
        },
        xAxis: [
            {
                type: 'category',
                data: tubiao3['name'],
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel:{
                    //X轴刻度配置
                    interval:0 ,//0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数,  
                    rotate:25 ,
                    textStyle:{
                        fontSize:12
                    }
               }
            }
        ],
        yAxis: [
            {
                type: 'value',
                min: 0,
                //max: 200,
                interval: 40,
                axisLabel: {
                    formatter: '{value}个'
                }
            }
        ],
        series: [
            {
                color:'#8DB9BF',
                type:'bar',
                data:tubiao3['num']
            }
        ]
    };
    
    if (option3 && typeof option3 === "object") {
        myChart3.setOption(option3, true);
    }
    
    var domBar4 = document.getElementById("bar4");
    var myChart4 = echarts.init(domBar4);
    
    option4 = {
        grid:{
            x:60,
            y:10,
            x2:25,
            y2:25
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data:['万元']
        },
        xAxis: [
            {
                type: 'category',
                data: ['中文','英文','德文','韩文','日文'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                min: 0,
                //max: 30,
                // interval: 50000,
                splitNumber: 7,
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [
            {
                color:'#AED4C3',
                type:'bar',
                data:tubiao4
            }
        ]
    };
    
    if (option4 && typeof option4 === "object") {
        myChart4.setOption(option4, true);
    }
    
    
    }
    