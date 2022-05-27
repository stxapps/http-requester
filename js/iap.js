const url = 'http://localhost:8088/';

const postVerify = async () => {
  const verifyUrl = url + 'verify';
  const data = verifyReq2;

  const response = await fetch(verifyUrl, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  console.log(result);
};

const postNotify = async (notifyPath) => {
  const notifyUrl = url + notifyPath;
  const data = notifyReq3;

  const response = await fetch(notifyUrl, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  const result = response.status;
  console.log(result);
};

const postStatus = async () => {
  const statusUrl = url + 'status';
  const data = statusReq1;

  const response = await fetch(statusUrl, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  console.log(result);
};

const main = () => {
  //postVerify();
  //postNotify('appstore/notify');
  //postNotify('playstore/notify');
  postStatus();
}
main();
