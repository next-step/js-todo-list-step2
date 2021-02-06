const getIP = (url) =>
  dns.resolve(url, function (err, addresses) {
    if (err) {
      console.log(err);
      return;
    }
    // console.log(`${url}: ${addresses}`);
    return addresses;
  });
