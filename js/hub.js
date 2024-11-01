// 12/24-word secret key
// account: address/public key, private key, gaiaAssociationToken, identityAddress/did?
// app: appPrivateKey, gaiaAddress==appPublicKey?

// to gaiaAssociationToken, sign EC256K with signerKeyHex (64 of account data private key)
//   on payload: {
//     childToAssociate: public key from appPrivateKey.slice(0, 64),
//     iss: compressed public key of signerKeyHex,
//     exp: 365 * 24 * 3600 + now,
//     iat: now,
//     salt,
//   }

// gaiaAddress: appPrivateKey (hexString) -> ECPair -> Address
const address1 = '';
// to v1Token, sign EC256K with appPrivateKey on payload:
//   { gaiaChallengeText, hubUrl, iss: appPublicKey, salt, gaiaAssociationToken }
const bearer1 = '';

const listFiles = async (url, address, bearer) => {
  // Authorization: verify JWT token, scopes, oldestTimestamp, issuerAddress, claimHub
  // empty, less then page size, more than page size
  // stat: true

  url += `list-files/${address}`;
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': bearer,
    },
    body: JSON.stringify({
      //page: null,
      pageSize: 4,
      stat: true,
    }),
  });
  const result = await response.json();
  console.log(result);
};

const putFile = async (url, address, bearer) => {
  // add, update
  // encrypt, not encrypt
  // <maxFileUploadSize, >maxFileUploadSize
  // if-match, if-none-match, etag

  let fpath, contentType, body;
  fpath = 'test1-again.json';
  contentType = 'application/json';
  body = JSON.stringify({ text: 'This is a test!' });

  url += `store/${address}/${fpath}`;
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': contentType,
      'Authorization': bearer,
      //'if-match': '*',
      //'if-none-match': '*',
    },
    body,
  });
  const result = await response.text();
  console.log(result);
};

const getFile = async () => {
  // Get existing file, get not existed file
  // Etag in header, Access-Control-Expose-Headers: ETag
  // cacheControl: public, max-age=1

  let url;
  url = '';

  const response = await fetch(url, { method: 'GET' });
  console.log('status:', response.status, response.statusText);
  console.log('headers:', ...response.headers);
};

const deleteFile = async (url, address, bearer) => {
  // Delete existing file, delete not existed file
  // if-match, if-none-match, etag
  let fpath;
  //fpath = 'beautiful1.jpg';
  fpath = 'beautiful1-more.jpg';
  //fpath = 'wallet-config.json';

  url += `delete/${address}/${fpath}`;
  const response = await fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': bearer,
      //'if-none-match': '*',
    },
  });
  if (response.status === 202) {
    console.log('deleted!');
  } else {
    const result = await response.json();
    console.log(result);
  }
};

const performFiles = async (url, address, bearer) => {

  let content;
  content = {
    values: [
      {
        values: [
          {
            id: '1',
            type: 'deleteFile',
            path: 'folder/img1-more.jpg',
          },
          {
            id: '2',
            type: 'putFile',
            path: 'folder/json1-more.json',
            content: {

            },
          },
        ],
        isSequential: true,
      },
      {
        values: [
          {
            id: '3',
            type: 'deleteFile',
            path: 'folder/img2-more.jpg',
            doIgnoreDoesNotExistError: true,
          },
          {
            id: '4',
            type: 'putFile',
            path: 'folder/json2-more.json',
            content: {

            },
          },
        ],
        isSequential: true,
      },
    ],
    isSequential: false,
  };

  const contentType = 'application/json';
  const body = JSON.stringify(content);

  url += `perform-files/${address}`;
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': contentType,
      'Authorization': bearer,
      //'if-match': '*',
      //'if-none-match': '*',
    },
    body,
  });
  const result = await response.text();
  console.log(result);
};

const revokeAccess = async (url, address, bearer) => {
  // Revoke then try to listFiles, putFile, deleteFile

  url += `revoke-all/${address}`;
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': bearer,
    },
    body: JSON.stringify({
      oldestValidTimestamp: 7,
    }),
  });
  const result = await response.json();
  console.log(result);
};

const run = async () => {
  const url = 'http://localhost:8088/';
  //await listFiles(url, address1, bearer1);
  //await putFile(url, address1, bearer1);
  //await getFile();
  await deleteFile(url, address1, bearer1);
  //await performFiles(url, address1, bearer1);
  //await revokeAccess(url, address1, bearer1);

  //await listFiles(url, address2, bearer2);
  //await putFile(url, address2, bearer2);
  //await getFile();
  //await deleteFile(url, address2, bearer2);
  //await revokeAccess(url, address2, bearer2);

  //rename
  //await listFiles(url, address3, bearer3);
  //await putFile(url, address3, bearer3);
  //await deleteFile(url, address3, bearer3);

  //await putFile(url, address4, bearer4);
  //await deleteFile(url, address4, bearer4);
};
run();
