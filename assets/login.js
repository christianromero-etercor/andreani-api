var settings = {
  "url": "https://apis.andreani.com/login?=",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Authorization": "basic c29sbmlrX2dsYTpiM2trMEF0OUo1THVwMUY=",
    "Cookie": "4358279e223c59cbcfbb93e6b3f9df26=f52c8f44d6ffe0ae093bca74ecf30bac"
  },
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
