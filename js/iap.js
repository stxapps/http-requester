const url = 'http://localhost:8088/';

const postStatus = async () => {
  const statusUrl = url + 'status';
  const data = {
    userId: '',
    signature: '',
    appId: 'com.bracedotto',
    doForce: true,
  };

  const response = await fetch(statusUrl, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  console.log(result);
};

const postVerify = async () => {
  const verifyUrl = url + 'verify';
  const data = {
    //source: 'AppStore',
    source: 'PlayStore',
    userId: '',
    productId: 'com.bracedotto.supporter',
    token: '',
  };

  const response = await fetch(verifyUrl, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  console.log(result);
};

const main = () => {
  postStatus();
  //postVerify();
}
main();
