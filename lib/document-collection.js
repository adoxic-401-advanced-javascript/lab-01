const files = require('./files');
const shortid = require('shortid');


class DocumentCollection {
  constructor(folder) {
    this.folder = folder;
  }

  save(object) {

    const id = shortid.generate();
    object.id = id;
  
    JSON.stringify(object);
    
    return files.writeFile(`${id}.json`, object, function(err) {
      if(err) {
        console.log(err);
      }
      console.log('Saved!');
    })
      .then(() => {
        return object;
      });
  }

  get(id) {
    const fileName = `${id}.json`;
    return files.readFile(`${this.folder}/${fileName}`, 'utf8')
      .then(json => {
        return JSON.parse(json);
      })  
      .catch(err => { console.log(err); });
  }

  getAll() {
    // TODO:
    // 1. read folder file names
    // 2. use Promise.all and map each file name to a this.get call (remove .json file extension!)
    // 3. "return" array of objects
    // 4. if expected, turn promisified fs errors into meaningful database errors
    return files.readdir(this.folder)
      .then(arr => {
        console.log(arr);
        return Promise.all(arr.map(file => {
          console.log(file.id)
          JSON.parse(file);
        
          return this.get(file.id);
        }));
      });
  }
}

module.exports = DocumentCollection;