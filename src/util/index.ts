export function succeed(data: any, msg = '', code = 200, result = 'success') {
  return {
    code,
    result,
    message: msg,
    data,
  };
}

export function failed(msg: string, code = 400, result = 'error') {
  return {
    code,
    result,
    message: msg,
    data: null,
  };
}
