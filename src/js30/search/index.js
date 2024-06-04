const cityJson = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'

const cities = [];

const getCityInfo = async () => {
  const response = await fetch(cityJson);
  const data = await response.json();
  cities.push(...data);
}

getCityInfo();

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function findMatches(wordToMatch, radius = cities) {
  return radius.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, !!this.value ? cities : [])
  const html = matchArray.map(item => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = item.city.replace(regex, `<span class="hl">${this.value}</span>`)
    const stateName = item.state.replace(regex, `<span class="hl">${this.value}</span>`)

    return `
       <div class="item">
        <span>${cityName}, ${stateName}</span>
        <span>${numberWithCommas(item.population)}</span>
      </div>
    `
  })

  suggestions.innerHTML = html.join('')
}

const searchInput = document.getElementById('searchInput')
const suggestions = document.querySelector('.suggestions')


searchInput.addEventListener('keyup', displayMatches)