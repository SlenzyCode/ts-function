import { Hercai } from "hercai";
import * as fs from "fs";

interface Res {
  reply: string;
}

const herc = new Hercai();

function yapayZeka(soru: string): Promise<string> {
  return new Promise((resolve, reject) => {
    log_soru(soru);

    herc.question({ model: "v3-beta", content: `${soru || "Merhaba"}` })
      .then((response: Res) => {
        if (response === undefined) {
          console.log("Error");
          reject("Error");
        } else {
          resolve(response.reply);
        }
      })
      .catch((error: any) => {
        console.error(error);
        reject(error);
      });
  });
}

function log_soru(soru: string): void {
  const logFilePath = 'sorular.txt';

  fs.appendFile(logFilePath, `${soru || "soru alınamadı."}\n`, (err: Error | null) => {
    if(err) {
      console.log("Bir hata oluştu")
    }
  });
}

export {
  yapayZeka
};