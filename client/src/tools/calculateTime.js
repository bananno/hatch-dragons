
const calculateTime = (startTime, requiredTime) => {
  let nowTime = new Date().getTime();

  let secondsElapsed = Math.round((nowTime - startTime)/1000);

  let secondsRequired = requiredTime[2] + (requiredTime[1] * 60) + (requiredTime[0] * 3600);

  let secondsRemaining = secondsRequired - secondsElapsed;

  let timeIsDone = secondsRemaining <= 0;

  return {
    secondsElapsed: secondsElapsed,
    secondsRequired: secondsRequired,
    secondsRemaining: secondsRemaining,
    timeIsDone: timeIsDone,
  };
};

export default calculateTime;
