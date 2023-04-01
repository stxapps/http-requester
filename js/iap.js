const url = 'http://localhost:8088/'; //'https://iap-001.uc.r.appspot.com/';
//const url = 'https://20230322t144535-dot-iap-001.uc.r.appspot.com/';

const postVerify = async () => {
  const verifyUrl = url + 'verify';
  const data = verifyReq3;

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
  const data = notifyReq8;

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
  const data = statusReq4;

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

const postPaddlePre = async () => {
  const preUrl = url + 'paddle/pre';
  const data = {
    userId: '02d4bcea7320a06c04026de2e063e7356bf46c54b34a691b839c3da53a60553fb9',
    randomId: '37bn-RW4G-oTUm-e4ni',
  };

  const response = await fetch(preUrl, {
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

const main = () => {
  //postVerify();
  //postNotify('playstore/notify');
  //postNotify('appstore/notify');
  //postNotify('paddle/notify');
  postStatus();
  //postPaddlePre();
}
main();
