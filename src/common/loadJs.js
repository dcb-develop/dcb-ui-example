exports.loadJs = (url, id) => {
  let body = document.getElementsByTagName('body')[0];
  let script = document.createElement('script');
  let cnzzProtocol = ((document.location.protocol === 'https:') ? 'https://' : 'http://');
  let link = cnzzProtocol + url;

  script.type = 'text/javascript';
  script.async = true;
  script.src = link;
  script.setAttribute('id', 'cnzz_stat_icon_' + id);
  script.style.display = 'none';

  body.appendChild(script);
};
