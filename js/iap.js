const url = 'http://localhost:8088/';

const postStatus = async () => {
  const statusUrl = url + 'status';
  const data = {
    userId: '02a0f1cc7ea19c560b345e4eb921181210114ce0d658681cd9a8161964b21bafda',
    signature: '304402201380cd11b3d5351a0e23d8569b5086d79b5ad35302862bd44de6ce5aca485843022008258246f1c60088e24e31a2ae5f4372d06c3465741a1fa4137b55854412011d',
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
    body: JSON.stringify(data),
  });
  const result = await response.json();
  console.log(result);
};

const postVerify = async () => {
  const verifyUrl = url + 'verify';
  const data = {
    //source: 'AppStore',
    source: 'PlayStore',
    userId: '02a0f1cc7ea19c560b345e4eb921181210114ce0d658681cd9a8161964b21bafda',
    productId: 'com.bracedotto.supporter',
    //token: 'engadepphjebcjepioankcmh.AO-J1OzLGAuIOt-yk4EGnAArmB_c9qY2oVWugwnUv2ANEhrj0lfxfGukqRpfXm1nIZHtf3RaxEeHEG_0F8vaimYaV_Hu8SB9yg',
    token: 'lebmkpgoccchkickgjdmklll.AO-J1OyRxMkCleIe9RVRD5oP4Z2c7A2SkxNB_Pf1vp70SJGy-t39DLt2PEuL5_XQAArnnVojh5H1mYP87WMU_H1fg8A5CfGSVA',
  };

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

const postNotify = async () => {
  const notifyUrl = url + 'playstore/notify';
  /*const data = {
    'message': {
      'data': 'eyJ2ZXJzaW9uIjoiMS4wIiwicGFja2FnZU5hbWUiOiJjb20uYnJhY2Vkb3R0byIsImV2ZW50VGltZU1pbGxpcyI6IjE2NTM0NjA1MzU4NjUiLCJ0ZXN0Tm90aWZpY2F0aW9uIjp7InZlcnNpb24iOiIxLjAifX0=',
      'messageId': '4686722601115858',
      'message_id': '4686722601115858',
      'publishTime': '2022-05-25T06:35:35.912Z',
      'publish_time': '2022-05-25T06:35:35.912Z',
    },
    'subscription': 'projects/iap-001/subscriptions/iap-server',
  };*/
  const data = {
    'message': {
      'data': 'eyJ2ZXJzaW9uIjoiMS4wIiwicGFja2FnZU5hbWUiOiJjb20uYnJhY2Vkb3R0byIsImV2ZW50VGltZU1pbGxpcyI6IjE2NTM0NjE3MTU3NDUiLCJzdWJzY3JpcHRpb25Ob3RpZmljYXRpb24iOnsidmVyc2lvbiI6IjEuMCIsIm5vdGlmaWNhdGlvblR5cGUiOjQsInB1cmNoYXNlVG9rZW4iOiJtaWdlYWxpb3BlbG9mbG1wbWplYmpkbGwuQU8tSjFPd0NyUUJ2M3RPVXFqN08yakZQNDV5b21mQ0c5OTc2Mjk0Q2hVN3paSnhqeTd5Y2dkZWJTMFc3VThUMXhJZjRENU1TNmtDN0NwR3ZNYk1NbzZRN0JoT1ZaVUEtT3ciLCJzdWJzY3JpcHRpb25JZCI6ImNvbS5icmFjZWRvdHRvLnN1cHBvcnRlciJ9fQ==',
      'messageId': '4686746114430798',
      'message_id': '4686746114430798',
      'publishTime': '2022-05-25T06:55:16.123Z',
      'publish_time': '2022-05-25T06:55:16.123Z',
    },
    'subscription': 'projects/iap-001/subscriptions/iap-server',
  };

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

const main = () => {
  //postStatus();
  //postVerify();
  postNotify();
}
main();
