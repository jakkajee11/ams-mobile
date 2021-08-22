const buildQueryString = (params: any) => {
  if (params !== undefined) {
    let urlPath = '';
    const paramKeys = Object.keys(params);
    if (paramKeys.length !== 0) {
      urlPath += '?';
    }

    return (urlPath += paramKeys
      .filter((v) => params[v] !== null)
      .map((key) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(
          params[key].toString()
        )}`;
      })
      .join('&'));
  }
  // if we got this far, return empty string
  return '';
};

export default buildQueryString;
