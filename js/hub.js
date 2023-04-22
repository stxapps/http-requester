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
const address1 = '1JNsK64gpFc63a3RVrwGXebXZRxo2zJULn';
// to v1Token, sign EC256K with appPrivateKey on payload:
//   { gaiaChallengeText, hubUrl, iss: appPublicKey, salt, gaiaAssociationToken }
const bearer1 = 'bearer v1:eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJnYWlhQ2hhbGxlbmdlIjoiW1wiZ2FpYWh1YlwiLFwiMFwiLFwiaHViLnN0YWNrc2RyaXZlLmNvbVwiLFwiYmxvY2tzdGFja19zdG9yYWdlX3BsZWFzZV9zaWduXCJdIiwiaHViVXJsIjoiaHR0cDovL2xvY2FsaG9zdDo4MDg4IiwiaXNzIjoiMDM4NjAzNzY4YjBhNWUyZjM3ZTlhY2IzNzNjMzEyMzJhYTc3N2U0YWI3YTdlOWNlMThjZWU0MzQ2ZDRhMjMzNmYyIiwic2FsdCI6IjRiNjVhZTkyMTIyNDQ0YTU5NDI0MmVmMzQ1MjcxZTQ1IiwiYXNzb2NpYXRpb25Ub2tlbiI6ImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSkZVekkxTmtzaWZRLmV5SmphR2xzWkZSdlFYTnpiMk5wWVhSbElqb2lNRE00TmpBek56WTRZakJoTldVeVpqTTNaVGxoWTJJek56TmpNekV5TXpKaFlUYzNOMlUwWVdJM1lUZGxPV05sTVRoalpXVTBNelEyWkRSaE1qTXpObVl5SWl3aWFYTnpJam9pTURNNE56QXlPVGN6TjJFMU5HTmlNakF4TWpFNE0ySXlPVGhrWm1Jek1EazRZakF4WkRnM1lqYzJNVEF4TW1VeE5UWTRNR05tTXpkak5XWmtZbVJoT0RobUlpd2laWGh3SWpveE56RXpNek13TmpjeUxqWTVMQ0pwWVhRaU9qRTJPREUzT1RRMk56SXVOamtzSW5OaGJIUWlPaUpqWWpkak9HRTRObVk1TTJRMk56ZzBOekJpWXpOaU1tWmxNREE1WkdVNU9DSjkuN1ozRXZCcVE4bEQ2M0Q4X21WZ2x1TzBFTVMwbVNRU2tSX2JvWTZvQ09jRDZqdWptdVNYS2pEZVBhM2FaRGFYaGdhcWVaT1NmSkU4a2QxQzdFbzFaYncifQ.553NMTrSXhYD68I7ds7uZm9SiWBXqQzlVJc5nWC5i1IsMTm1-FNFrnrZqBlg0VS-zNFALqXGu2Whk_RYnmdqHw';

const address2 = '1JNsK64gpFc63a3RVrwGXebXZRxo2zJULn';
const bearer2 = 'bearer v1:eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJnYWlhQ2hhbGxlbmdlIjoiW1wiZ2FpYWh1YlwiLFwiMFwiLFwiaHViLnN0YWNrc2RyaXZlLmNvbVwiLFwiYmxvY2tzdGFja19zdG9yYWdlX3BsZWFzZV9zaWduXCJdIiwiaXNzIjoiMDM4NjAzNzY4YjBhNWUyZjM3ZTlhY2IzNzNjMzEyMzJhYTc3N2U0YWI3YTdlOWNlMThjZWU0MzQ2ZDRhMjMzNmYyIiwiYXNzb2NpYXRpb25Ub2tlbiI6ImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSkZVekkxTmtzaWZRLmV5SmphR2xzWkZSdlFYTnpiMk5wWVhSbElqb2lNRE00TmpBek56WTRZakJoTldVeVpqTTNaVGxoWTJJek56TmpNekV5TXpKaFlUYzNOMlUwWVdJM1lUZGxPV05sTVRoalpXVTBNelEyWkRSaE1qTXpObVl5SWl3aWFYTnpJam9pTURNNE56QXlPVGN6TjJFMU5HTmlNakF4TWpFNE0ySXlPVGhrWm1Jek1EazRZakF4WkRnM1lqYzJNVEF4TW1VeE5UWTRNR05tTXpkak5XWmtZbVJoT0RobUlpd2laWGh3SWpveE5qa3lOemcyTkRVMUxqZzFOQ3dpYVdGMElqb3hOamd5TURjeU9EVTFMQ0p6WVd4MElqb2lOak0zT0dSaU5EUTNZekl6TmpJeE9HTmlNbVpqWW1WbE16TXlZemd3WVdNaWZRLmxaMXdvUGd4dG9NM2ljODN2eWV0ZzdobzhBVGRZU24xMTBLdTFBc05uYXp4QjJlWGtfUHdmdHppMVFwMkZkWjJRckFjLW9fYUVpTmw5cVVCeW9hQ0hBIiwiaHViVXJsIjoiaHR0cHM6Ly9odWIuc3RhY2tzZHJpdmUuY29tIiwic2FsdCI6ImEwZjc4MzVhMTM5ZGJmMTliZjNhZmI1MTgzNGE3ZjIxIn0.vlw4NLAvXABJ9QeY2kgarGhRRK1kW2I4ZB-xnIiaHha0eYGhrgFhFPjEYGJDYCYmKu6GqmgebHcsQT7CYO40cg';

const address3 = '1JNsK64gpFc63a3RVrwGXebXZRxo2zJULn';
const bearer3 = 'bearer v1:eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJnYWlhQ2hhbGxlbmdlIjoiW1wiZ2FpYWh1YlwiLFwiMFwiLFwiaHViLnN0YWNrc2RyaXZlLmNvbVwiLFwiYmxvY2tzdGFja19zdG9yYWdlX3BsZWFzZV9zaWduXCJdIiwiaXNzIjoiMDM4NjAzNzY4YjBhNWUyZjM3ZTlhY2IzNzNjMzEyMzJhYTc3N2U0YWI3YTdlOWNlMThjZWU0MzQ2ZDRhMjMzNmYyIiwiYXNzb2NpYXRpb25Ub2tlbiI6ImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSkZVekkxTmtzaWZRLmV5SmphR2xzWkZSdlFYTnpiMk5wWVhSbElqb2lNRE00TmpBek56WTRZakJoTldVeVpqTTNaVGxoWTJJek56TmpNekV5TXpKaFlUYzNOMlUwWVdJM1lUZGxPV05sTVRoalpXVTBNelEyWkRSaE1qTXpObVl5SWl3aWFYTnpJam9pTURNNE56QXlPVGN6TjJFMU5HTmlNakF4TWpFNE0ySXlPVGhrWm1Jek1EazRZakF4WkRnM1lqYzJNVEF4TW1VeE5UWTRNR05tTXpkak5XWmtZbVJoT0RobUlpd2laWGh3SWpveE5qa3lOemt5TkRneExqVXhMQ0pwWVhRaU9qRTJPREl3TnpnNE9ERXNJbk5oYkhRaU9pSTJZelF5T0daaFptWXhZMlUwWmpaalltRTVOMlV3WXpRd056WTVOR001T1NKOS5Zbml3UEJvLTRJLXlURmtsN3RYSG1JdzZxcXRBN0dwVl9QREk1YmFiekxxWFNnNUdTa2tUTENhalo5bDI0a3FfdzYwXzl2a3BfLTNRWWVkckNTX2ZjQSIsImh1YlVybCI6Imh0dHBzOi8vaHViLnN0YWNrc2RyaXZlLmNvbSIsInNhbHQiOiJmZjA4NmYxMDliZDA0ZGZiZmMzNmU4ZTAwMGIwYjg5YyIsInNjb3BlcyI6W3sic2NvcGUiOiJwdXRGaWxlQXJjaGl2YWxQcmVmaXgiLCJkb21haW4iOiJ0ZXN0In1dfQ.F2azDNnKO9MqF9tMfMh4y0dtsIRB3WCeIKLjV94tVPXI8sI7x38rK6t-cb3CUH7nbuKvdltROpbS2Dhwr5ggvw';

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
      page: null,
      //page: 'CiwxSk5zSzY0Z3BGYzYzYTNSVnJ3R1hlYlhaUnhvMnpKVUxuL3Rlc3QzLnR4dA==',
      stat: false, //true
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
  fpath = 'test1.json';
  contentType = 'application/json';
  body = JSON.stringify({ text: 'This is a test!' });

  //fpath = 'test2.json';
  //contentType = 'application/json';
  //body = JSON.stringify({ "iv": "3e11ab5513dad66c4ea253a5aa92aaa3", "ephemeralPK": "0335e1fa828b47e180d3f155f176f90085d590091e3dcc8e40860985cae547f58c", "cipherText": "6e8d1a564d0e9cd869ec122c26db8d0d3b9efb69650bd21b06d017b4292460bdd631e1f80d8fadc145dc2e92ee39e2378bf24b5f2f6e9dcb45f463e53ef1c2904f2a9b312e34f5ad693e5c2c65465da87dc4db58e09f43245e9aa4b4a3b26aeac0aba4f0b13ff31923a188b6d9d10d023c42218717f610e6ce32f184fe5f40cc88a6f52523cb36039ff9f67cf6493faf46374a8848363e9f308ef71dc9fe85dff8f4bff504db6e265b0137d188ed1a6ec47d6f1013b758d82b2907a5c867370a8b9f3929c7dce08c2d81fcc2ab07aaec4fc7d2e86dd347e3a5e1829bdf373948a5a4617768a4499e3545d39638d00cb1e0d39478af2efcf75e92307e7f380d10d0f7f96c6ec8a4559e50007959efad1cf3f9dd4be024ed8704f4e0fdc1fc84b4eb047dd75d23d96c20f6161b05050f52668f9755ac3db00c906f3f7660ce095f66e8bc0299f9d6069866db1c00775414e24c9e0ecdf7b652a54fffca2d992715f7b9982cfc786dd40f58ebc701a90b182e523b10485cbfc601b4f429719033471f1f7f9293279d99e95aa3b7f0feba7920ed1d84bc3e99490b5b66a35703d93cdac8bc68a340abd14a1e9693477a4f1d197b37e632d9fb5588146fca5cb28af359aa1fd62bb172f2e677aef43e882472db81a730d79adb285818d290014e7fdc9d455f26ca27ad5514aef8079c0fc19f0a9477353973e1406eb33327541d4558", "mac": "9f42c7dd1ea0512ff7c4f669e0859a83b9c74deca77c9088c31fa3b46c55ab92", "wasString": true });

  //fpath = 'test3.txt';
  //contentType = 'text/plain';
  //body = 'gaia.blockstack.org is down and Data is not accessible any more. Was this a purposeful shutdown I missed the announcement (I saw there are some discussions here about the costs of it accumulating) or is it just a temporary hiccup? Or are you trying to teach us a lesson on the importance of running our own storage instead of relying on a central entity? :smiley:';

  //const dataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
  //const blob = await (await fetch(dataUri)).blob();
  //fpath = 'beautiful.png';
  //contentType = 'image/png';
  //body = blob;

  //const blob = await (await fetch('https://storage.googleapis.com/sdrive-001.appspot.com/1JNsK64gpFc63a3RVrwGXebXZRxo2zJULn/0%202TvFvnBSBXfpv1SC.jpg')).blob();
  //fpath = 'beautiful1.jpg';
  //contentType = 'image/jpeg';
  //body = blob;

  url += `store/${address}/${fpath}`;
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': contentType,
      'Authorization': bearer,
      //'if-match': '*',
      //'if-match': '"4d562484f0cb58a2fc225a5bbc949b6d"',
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
  //url = 'https://storage.googleapis.com/sdrive-001.appspot.com/1JNsK64gpFc63a3RVrwGXebXZRxo2zJULn/0%202TvFvnBSBXfpv1SC.jpg';
  url = 'https://storage.googleapis.com/sdrive-001.appspot.com/1JNsK64gpFc63a3RVrwGXebXZRxo2zJULn/not-existed.jpg';

  const response = await fetch(url, { method: 'GET' });
  console.log('status:', response.status, response.statusText);
  console.log('headers:', ...response.headers);
};

const deleteFile = async (url, address, bearer) => {
  // Delete existing file, delete not existed file
  // if-match, if-none-match, etag
  let fpath;
  fpath = 'test1.json';

  url += `delete/${address}/${fpath}`;
  const response = await fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': bearer,
      //'if-match': '"08d7da1ceed7b12bad5a3ec274a256da"',
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
      oldestValidTimestamp: 7, // 1681794680
    }),
  });
  const result = await response.json();
  console.log(result);
};

const run = async () => {
  const url = 'http://localhost:8088/'; //'https://hub-dot-sdrive-001.uc.r.appspot.com/';
  //await listFiles(url, address1, bearer1);
  //await putFile(url, address1, bearer1);
  //await getFile();
  //await deleteFile(url, address1, bearer1)
  //await revokeAccess(url, address1, bearer1);

  //await listFiles(url, address2, bearer2);
  //await putFile(url, address2, bearer2);
  //await getFile();
  //await deleteFile(url, address2, bearer2)
  //await revokeAccess(url, address2, bearer2);

  //rename
  //await listFiles(url, address3, bearer3);
  //await putFile(url, address3, bearer3);
  await deleteFile(url, address3, bearer3)
};
run();
