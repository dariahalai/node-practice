const fsPromises = require("fs").promises;
const path = require("path");
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator");
const checkExtention = require("./helpers/checkExtention");

const createFile = (fileName, content) => {
  const file = { fileName, content };
  const validFile = dataValidator(file);
  if (validFile.error) {
    console.log(
      chalk.red(
        `PLEASE specify ${validFile.error.details[0].context.key} parameter`
      )
    );
    return;
  }
  const { isExtentionValid, fileExtention } = checkExtention(fileName);
  if (!isExtentionValid) {
    return console.log(
      chalk.red(
        `Sorry this application doesn't support ${fileExtention},please select any file `
      )
    );
  }
  const dirPath = path.join(__dirname, "./files", fileName);
  fsPromises
    .writeFile(dirPath, content, "utf-8")
    .then((data) => {
      console.log(chalk.blue("File created successfully"));
    })
    .catch((e) => console.log(chalk.red(e)));
};

const getFiles = () => {
  const pathDir = path.join(__dirname, "./files");
  fsPromises
    .readdir(pathDir)
    .then((data) => {
      if (!data.length) {
        console.log(chalk.yellow("No files in this derectory"));
        return;
      } else {
        return data.forEach((el) => console.log(el));
      }
    })
    .catch((e) => console.log(e));
};

const getFile = (name) => {
  fs.readdir(path.join(__dirname, "./files"))
    .then((data) => {
      const findFileName = data.find((el) => el === name);
      if (!findFileName) {
        console.log(chalk.red(`No file with name ${name} found`));
        return;
      }
      return fs.readFile(path.join(__dirname, "./files", name), "utf-8");
    })
    .then((data) => {
      const newObject = {
        message: "Sucsess",
        fileName: name,
        content: data,
        extention: checkExtention(name).fileExtentions,
      };
      console.log(newObject);
    });
};

module.exports = { createFile, getFiles, getFile };
