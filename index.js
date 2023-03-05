const { createFile, getFiles, getFile } = require("./files");
const argv = require("yargs").argv;

const invokeAction = ({ action, fileName, content }) => {
  switch (action) {
    case "create":
      createFile(fileName, content);
      break;
    case "get":
      getFiles();
      break;
    case "find":
      getFile(fileName);
      break;
    default:
      break;
  }
};
invokeAction(argv);
