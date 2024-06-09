{
let event = "connectAllData";

var allData = require("Storage").open(event+".csv", "a");

const buffer = {
  start: null,
  end: null,
  data: []
};
const maxSamples = 150;

const computeBufferAverage = () => {
  let sum = [], sum2=[], mean = [], std = [];
  const nrows = maxSamples;
  const ncols = buffer.data[0].length;
  for(let i=0;i<ncols;i++) {
    sum[i] = 0; sum2[i] = 0; mean[i] = 0; std[i] = 0;
  }
  
  for(const data of buffer.data){
  for(let i=0; i<ncols; i++)
  {
    sum[i] += data[i];
    sum2[i] += data[i]*data[i];
  }
  }
  
  for (let i=0; i<ncols; i++) {
    mean[i] = sum[i] / nrows;
    std[i] = Math.sqrt(nrows*sum2[i] - Math.pow(sum[i], 2))/(nrows-1);
  }
  return {mean: mean, std: std};
};

const recorder = (hrm) => {
  var hrmRaw = [
    "HRM:",
    hrm.raw,
    hrm.filt,
    hrm.bpm,
    hrm.confidence
  ];
  var c = Bangle.getCompass();
  var a = Bangle.getAccel();

if (buffer.data.length === 0) {
    buffer.start = Math.floor(Date.now());
  }
  
  // Variables: accelerometer[x,y,z], magentometr [x, y, g, dx, dy, dz], hrm [raw, filter, bpm, confidence]
  if (buffer.data.length < maxSamples) {
    buffer.data.push([
      a.x, a.y,a.z,c.x,c.y,c.z,c.dx,c.dy,c.dz,hrm.raw,hrm.filt,hrm.bpm,hrm.confidence
    ]);
  } else {
    buffer.end = Math.floor(Date.now());
    const result = computeBufferAverage(buffer.data);
    
    const str = [
      buffer.start,
      buffer.end,
      result.mean.join(","),
      result.std.join(",")
    ].join(",");
    allData = require("Storage").open(event+".csv", "a");
    allData.write(str);
    allData.write("\n");
    buffer.data = [];
  }
}

module.exports = recorder;
}