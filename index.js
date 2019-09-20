const DocumentCollection = require('./lib/document-collection');

const path = './test-data';
const documents = new DocumentCollection(path);

const testObj = {
  key: 'ture',
  slf: 33,
  element: true
};

documents.save(testObj)
  .then(res => {
    console.log('saved', res);
    documents.getAll()
      .then(res => {
        console.log('read', res);
      });
  });


