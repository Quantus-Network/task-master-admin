const extractErrMsg = (error: any): string => {
  if (error.body?.error) {
    return error.body.error;
  }

  if (error.body?.errors?.[0]) {
    return error.body.errors[0].message;
  }

  return error.message;
};

export default extractErrMsg;
