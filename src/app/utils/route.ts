export const getRouteWithParam = (
  route: string,
  param: string,
  value: string | number
) => route.replace(new RegExp(`:${param}`, 'g'), value.toString());
