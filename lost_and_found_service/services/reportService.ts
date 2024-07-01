import fs from 'fs'

export class ReportService {
    constructor(){

    }

    async uploadFiles(files: any){
        const _files:any = []
        for(let i = 0; i < files.length; i++){
            const _name = files[i].originalname.split(".")
            const name = _name[0] + '_' + Date.now() +  "." + _name[1]
            fs.writeFile('uploads/'+name, files[i].buffer, (err) => {
                if (err) {
                  console.error(err);
                    throw new Error(`Unable to upload file : ${err}`)
                }
            })
            _files.push(name)
        }
        return _files
    }
}