const apiRequest = async (url = "", optionObj = null, errMsg = null) => {
  try {
    const response = await fetch(url, optionObj);
    if (!response.ok) throw Error("error occoured during request");
  } catch (err) {
    errMsg = err.message;
    return errMsg;
  } finally {
    return errMsg;
  }
};
export default apiRequest;
