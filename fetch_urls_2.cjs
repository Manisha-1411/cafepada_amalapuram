const fs = require('fs');
const https = require('https');

const userLinks = {
  'salted fries': 'https://ibb.co/FkbMP1LM',
  'garlic pops': 'https://ibb.co/23vX68Q1',
  'veg nuggets': 'https://ibb.co/20HMx5ds',
  'corn rolls': 'https://ibb.co/tM1tqWXS',
  'onion rings': 'https://ibb.co/3mCrCBBs',
  'veg lollipops': 'https://ibb.co/4wgP2zG4',
  'chicken nuggets': 'https://ibb.co/ksksQqBp',
  'chicken fingers': 'https://ibb.co/35fBtqFk',
  'chicken popcorn': 'https://ibb.co/Kcy3zYKs',
  'chicken fried momos': 'https://ibb.co/mf1qFSH',
  'chicken & corn pizza': 'https://ibb.co/mf1qFSH',
  'chicken nugget pizza': 'https://ibb.co/nNsrGSRf',
  'choco brownie (hot)': 'https://ibb.co/ycdVK1SV',
  'red valvet brownie with ice cream': 'https://ibb.co/zHFqkZBF',
  'oreo strawberry': 'https://ibb.co/qLpMmv0K',
  'caramel kitkat': 'https://ibb.co/t74cVJk',
  'blue margarita': 'https://ibb.co/5g1QCzJ8',
  'mint blast mojito': 'https://ibb.co/Mk8XPVs9',
  'raspberry twist': 'https://ibb.co/fYvvtQd5',
  'bubblegum temptation': 'https://ibb.co/twSxDSRQ',
  'watermelon mojito': 'https://ibb.co/x86tKw5T',
  'oreo thick coffee': 'https://ibb.co/P3Dc6pc',
  'choco thick coffee': 'https://ibb.co/HpPbrHZz',
  'kitkat thick coffee': 'https://ibb.co/YTPfXr7K',
  'brownie thick coffee': 'https://ibb.co/Tx5pQfB4',
  'cold coffee(plain)': 'https://ibb.co/9mFspXPV',
  'double shot cold coffee': 'https://ibb.co/BHBFjSGz',
  'chocolate cold coffee': 'https://ibb.co/8gYPLTR2',
  'caramel cold coffee': 'https://ibb.co/FbSHphyz',
  'oreo choco cold coffee': 'https://ibb.co/652pbD1',
  'hazelnut choco cold coffee': 'https://ibb.co/VYHYNg2B',
  'kitkat cold coffee': 'https://ibb.co/DPR7r6yg',
  'brownie cold coffee': 'https://ibb.co/CpYpTs3r'
};

function fetchDirectUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/<meta property="og:image" content="([^"]+)"/);
        if (match && match[1]) {
          resolve(match[1]);
        } else {
          resolve(url);
        }
      });
    }).on('error', () => resolve(url));
  });
}

(async () => {
  console.log('Fetching direct URLs...');
  const directUrls = {};
  for (const [name, url] of Object.entries(userLinks)) {
    directUrls[name.toLowerCase()] = await fetchDirectUrl(url);
    console.log('Fetched:', name, '->', directUrls[name.toLowerCase()]);
  }
  
  let appContent = fs.readFileSync('c:/Users/akhil/OneDrive/Desktop/cafe panda/src/App.jsx', 'utf8');
  const startString = 'const MENU_DATA = [';
  const endString = '];';
  const startIndex = appContent.indexOf(startString);
  const endIndex = appContent.indexOf(endString, startIndex) + endString.length;
  let arrayStr = appContent.substring(startIndex + startString.length - 1, endIndex - 1).trim();

  const items = eval(arrayStr);

  const updatedItems = items.map(item => {
    const directUrl = directUrls[item.name.toLowerCase()];
    if (directUrl) {
      item.image = directUrl;
    }
    return item;
  });

  let newArrayStr = 'const MENU_DATA = [\n';
  updatedItems.forEach(i => {
    newArrayStr += '  ' + JSON.stringify(i) + ',\n';
  });
  newArrayStr += '];';

  appContent = appContent.slice(0, startIndex) + newArrayStr + appContent.slice(endIndex);
  fs.writeFileSync('c:/Users/akhil/OneDrive/Desktop/cafe panda/src/App.jsx', appContent);
  console.log('Done!');
})();
