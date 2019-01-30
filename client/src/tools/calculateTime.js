
const calculateTime = (startTime, requiredTime) => {
  let times = {};

  let nowTime = new Date().getTime();

  times.secondsElapsed = Math.round((nowTime - startTime)/1000);

  if (requiredTime) {
    times.secondsRequired = requiredTime[2] + (requiredTime[1] * 60) + (requiredTime[0] * 3600);
    times.secondsRemaining = times.secondsRequired - times.secondsElapsed;
    times.timeIsDone = times.secondsRemaining <= 0;
  }

  return times;
};

export default calculateTime;
