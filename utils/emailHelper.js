import fs from "fs";

export function getRandomEmail() {
  const data = fs.readFileSync("./emails.json", "utf-8");
  const emailList = JSON.parse(data).emails;
  const randomIndex = Math.floor(Math.random() * emailList.length);
  return emailList[randomIndex];
}
