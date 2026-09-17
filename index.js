import parseFile from './parser.js';
const genDiff = (filepath1, filepath2) => { 
    const firstObject = parseFile(filepath1);
    const secondObject = parseFile(filepath2);
};

export default genDiff;