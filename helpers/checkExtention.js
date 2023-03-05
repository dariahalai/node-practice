const checkExtention = (fileName) => {
  const EXTENTIONS = ["txt", "js", "json", "xml", "yaml"];
  const fileExtention = fileName.slice(fileName.lastIndexOf(".") + 1);
  const isExtentionValid = EXTENTIONS.some((el) => el === fileExtention);
  return { isExtentionValid, fileExtention };
  //   for (let el of EXTENTIONS) {
  //     if (fileName.endsWith(el)) {
  //       return true;
  //     }
  //     return false;
  //   }
};

module.exports = checkExtention;
