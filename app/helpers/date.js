import moment from 'moment';

export default date => {
  let aestTime = new Date(date).toLocaleString('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
  });
  aestTime = new Date(aestTime);
  // return aestTime.toLocaleString();
  return moment(aestTime).format('lll');
};
