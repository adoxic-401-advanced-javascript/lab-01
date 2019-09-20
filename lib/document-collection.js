const files = require('./files');
const shortid = require('shortid');
const path = require('path');

class DocumentCollection {
  constructor(folder) {
    this.folder = folder;
  }

  save(object) {

    const id = shortid.generate();
    object.id = id;
  
    const stringy = JSON.stringify(object);
    
    return files.writeFile(`${this.folder}/${id}.json`, stringy, function(err) {
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
    return files.readdir(this.folder)
      .then(arr => {
        return Promise.all(arr.map(file => {
          const fileId = path.parse(file).name;
        
          return this.get(fileId);
        }));
      });
  }
}

module.exports = DocumentCollection;