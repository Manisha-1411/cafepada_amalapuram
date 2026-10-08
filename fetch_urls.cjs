const fs = require('fs');
const https = require('https');

const userLinks = {
  'French Fries(salted)': 'https://ibb.co/FkbMP1LM',
  'peri peri fries': 'https://ibb.co/kg1Jd04J',
  'garlic pops': 'https://ibb.co/23vX68Q1',
  'veg nuggets': 'https://ibb.co/20HMx5ds',
  'chicken loaded french fries': 'https://ibb.co/cKLtQ1fK',
  'classic veg fried momos': 'https://ibb.co/C5bLJ9F5',
  'veg lollipops': 'https://ibb.co/4wgP2zG4',
  'corn rolls': 'https://ibb.co/tM1tqWXS',
  'onion rings': 'https://ibb.co/3mCrCBBs',
  'chicken nuggets': 'https://ibb.co/ksksQqBp',
  'chicken fingers': 'https://ibb.co/35fBtqFk',
  'chicken popcorn': 'https://ibb.co/Kcy3zYKs',
  'classic veg steamed momos': 'https://ibb.co/zW7p8cLt',
  'classic veg schezwan momos': 'https://ibb.co/pvnqxg0F',
  'pan-fried momos': 'https://ibb.co/qhnTMZT',
  'chicken momos': 'https://ibb.co/mf1qFSH',
  'crunchy chicken wings': 'https://ibb.co/Jf4SLBn',
  'peri peri chicken wings': 'https://ibb.co/JRZY3L0P',
  'classic margherita pizza': 'https://ibb.co/pBBJPtDL',
  'creamy golden corn pizza': 'https://ibb.co/dwPd04q3',
  'peppy paneer pizza': 'https://ibb.co/5X6P4YcX',
  'peri peri paneer pizza': 'https://ibb.co/HTNTsT8x',
  'BBQ corn pizza': 'https://ibb.co/Y7WW77hh',
  'veg carnival pizza': 'https://ibb.co/sdGF50dV',
  'classic chicken pizza': 'https://ibb.co/qFJffqN2',
  'chicken&corn pizza': 'https://ibb.co/0VqbRN20',
  'BBq chicken pizza': 'https://ibb.co/PLPtrbf',
  'chicken paneer pizza': 'https://ibb.co/0y2Lpqm8',
  'chicken popcorn pizza': 'https://ibb.co/v67f8xYW',
  'chicken nugget pizza': 'https://ibb.co/nNsrGSRf',
  'veg patty burger': 'https://ibb.co/jvZvcmj8',
  'cheesy veg patty burger': 'https://ibb.co/Kct2r93p',
  'mayo loaded veg burger': 'https://ibb.co/YBsQfb8S',
  'veg double patty burger': 'https://ibb.co/yFtLqPrN',
  'veg supreme burger': 'https://ibb.co/TDNrdYx3',
  'chicken patty burger': 'https://ibb.co/FbRs5Td9',
  'cheesy chicken patty burger': 'https://ibb.co/TBFwt1w5',
  'mayo loaded chicken burger': 'https://ibb.co/B2hW50jg',
  'double patty chicken burger': 'https://ibb.co/kVs5GPFv',
  'chicken supreme burger': 'https://ibb.co/8g7TkRPP',
  'choco brownie(hot)': 'https://ibb.co/ycdVK1SV',
  'choco brownie with ice cream': 'https://ibb.co/zHFqkZBF',
  'red valvet brownie with ice cream': 'https://ibb.co/Wv8s2mg3',
  'oreo brownie bowl': 'https://ibb.co/BVqn0hKC',
  'kitkat brownie bowl': 'https://ibb.co/PGBrqR6Q',
  'caramel biscuit brownie bowl': 'https://ibb.co/fjFDswN',
  'kunafa brownie bowl': 'https://ibb.co/B2LXjNmM',
  'classic cream kunafa': 'https://ibb.co/WWgPBZQ4',
  'kunafa chocolate bar': 'https://ibb.co/h1Cv1xwj',
  'boba pearl cold coffee': 'https://ibb.co/273Tqrnt',
  'double shot boba CC': 'https://ibb.co/ZpBq56TB',
  'choco boba CC': 'https://ibb.co/xqZ6QsRz',
  'oreo boba CC': 'https://ibb.co/N2hn1mZD',
  'caramel boba CC': 'https://ibb.co/6JVznLzf',
  'kitkat boba CC': 'https://ibb.co/RpXPybMC',
  'hazelnut choco boba CC': 'https://ibb.co/k2L6XXsp',
  'brownie boba CC': 'https://ibb.co/SjJKSYx',
  'vanilla snow': 'https://ibb.co/0RsVWjbT',
  'strawberry': 'https://ibb.co/TMcWTqWh',
  'oreo vanilla': 'https://ibb.co/x814gqmV',
  'butterscotch': 'https://ibb.co/zhDfTwRF',
  'chocolate': 'https://ibb.co/3y78x5Yc',
  'oreo choco': 'https://ibb.co/B1DpNj8',
  'oreo stwarberry': 'https://ibb.co/qLpMmv0K',
  'blue moon vanilla': 'https://ibb.co/DPnXgXPm',
  'caramel choco': 'https://ibb.co/d0SQ3PVk',
  'caramel butterscotch': 'https://ibb.co/Y4nHN1kh',
  'black currant': 'https://ibb.co/GvGPCFYw',
  'blue berry': 'https://ibb.co/4ncWTNDP'
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
