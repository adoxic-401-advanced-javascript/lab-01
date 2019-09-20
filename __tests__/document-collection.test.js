const DocumentCollection = require('../lib/document-collection');

jest.mock('../lib/files.js', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  readdir: jest.fn(),
}));

// for setting up mock expectations
const { readFile, writeFile, readdir } = require('../lib/files');

describe('Document Collection', () => {
  
  const folder = './docs';
  
  it('writes file', () => {
    const documentCollection = new DocumentCollection(folder);
    const obj = {
      stuff: 'fake',
      thing: 4
    };
    const writePromise = Promise.resolve(obj);
    writeFile.mockReturnValueOnce(writePromise);
    
    return documentCollection.save(obj)
      .then(res => {
        expect(res).toEqual(obj);
        expect(documentCollection.folder).toBe(folder);
        expect(typeof res.id).toBe('string');
      });
  });
  
  it('writes file', () => {
    const documentCollection = new DocumentCollection(folder);
    const obj2 = {
      stuff: 'things',
      electric: true
    };
    const writePromise2 = Promise.resolve(obj2);
    writeFile.mockReturnValueOnce(writePromise2);
    return documentCollection.save(obj2)
      .then(res => {
        expect(res).toEqual(obj2);
        expect(documentCollection.folder).toBe(folder);
        expect(typeof res.id).toBe('string');
      });
  });
    
  it('reads file', () => {
    const obj = {
      stuff: 'fake',
      thing: 4,
      id: 'string'
    };
    
    const readPromise = Promise.resolve(JSON.stringify(obj));
    readFile.mockReturnValueOnce(readPromise);
    
    const documentCollection = new DocumentCollection(folder);

    return documentCollection.get(obj.id)
      .then(object => {
        expect(readFile.mock.calls[0][0]).toBe(`${folder}/${obj.id}.json`);
        expect(object.id).toBe('string');
      });
    
  });

  it('gets all', () => {
    const obj = {
      stuff: 'fake',
      thing: 4,
      id: 'string'
    };

    
    const dirPromise = Promise.resolve(['string.json']);
    readdir.mockReturnValueOnce(dirPromise);
    
    const readPromise = Promise.resolve(JSON.stringify(obj));
    readFile.mockReturnValueOnce(readPromise);
    
    const documentCollection = new DocumentCollection(folder);
    return documentCollection.getAll()
      .then(res => {
        expect(readdir.mock.calls[0][0]).toBe(folder);
      });
  });
});
