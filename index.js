const echarts = require("echarts");
const { createCanvas } = require('canvas');
var fs = require('fs');



let defaultConfig = {
    width: 500,
    height: 500,
    enableAutoDispose: true,
    option:{
        title: {text: 'test'},
        tooltip: {},
        legend: {data: ['test']},
        xAxis: {data: ["a", "b", "c", "d", "f", "g"]},
        yAxis: {},
        series: [{
            name: 'test',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    }
}

const setCanvasCreator = function(){
    echarts.setCanvasCreator(function () {
        return createCanvas();
    });
}
exports.setCanvasCreator = setCanvasCreator;
setCanvasCreator();

exports.createEChartsImage = function (config) {
    let canvas;

    config = Object.assign({}, defaultConfig,config)
    config.option.animation = false;

    if (config.canvas) {
        canvas = config.canvas;
    }else{
        canvas = createCanvas(config.width, config.height)
    }
    const ctx = canvas.getContext('2d')
    if (config.font) {ctx.font = config.font;}
    
    let chart = echarts.init(canvas);

    chart.setOption(config.option);

    if (config.path) {
        try {
            var dom = chart.getDom().toBuffer();
            fs.writeFileSync(config.path, dom);
            if(config.enableAutoDispose){
              chart.dispose();
            }
            console.log("Create Img:" + config.path)
        } catch (err) {
            console.error("Error: " + err.message)
        }
        
    } else {
        if(config.enableAutoDispose){
          chart.dispose();
        }
        return chart.getDom().toBuffer();
    }
}