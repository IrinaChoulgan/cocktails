import './sass/main.scss';
import axios from 'axios';

const refs = {
    form: document.querySelector('#form'),
    input: document.querySelector('#search'),
    container: document.querySelector('.container'),
    more: document.querySelector('#more')
}

const handlerSubmit = (e) => {
    e.preventDefault()
    //innerHTML для отчистки разметки если нужно
    const value = refs.input.value;
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`)
    .then(coctails => renderCollection(coctails.data.drinks))
    .catch(err => console.log(err))

    //fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`)
    //.then(response => response.json())
    //.then(coctails => renderCollection(coctails.drinks))
    //.catch(err => console.log(err))
}


// function createItem ({strDrink, strDrinkThumb}) {
//   const article = `
//   <article>
//       <img alt="${strDrink}" src="${strDrinkThumb}"/>
//       <p>${strDrink}</p>
//   </article>
//   `
//   refs.container.insertAdjacentHTML('beforeend', article)
// }

function renderCollection (arr) {
    arr.forEach(el => createItem(el)) 
}

//refs.form.addEventListener('submit', handlerSubmit)


///работа с API с GitHub

let currentPage = 1;

const gitHandlerSubmit = (e) => {
    e.preventDefault()
    const value = refs.input.value;
    axios.get(`https://api.github.com/search/users?q=${value}&client_id=67684cabc84f94f0938e&client_secret=782ea639550c1b5d986bdd8129813652ed04c92c&page=${currentPage}`)
    .then(result => renderGitCollection(result.data.items))
    .then(() => currentPage++)
    .catch(err => console.log(err))
}
refs.form.addEventListener('submit', gitHandlerSubmit)

function createGitItem ({avatar_url, login}) {
    const article = `
    <article>
        <img alt="${avatar_url}" src="${login}"/>
        <p>${login}</p>
    </article>
    `
    refs.container.insertAdjacentHTML('beforeend', article)
  }

  function renderGitCollection (arr) {
    arr.forEach(el => createGitItem(el)) 
}
refs.more.addEventListener('click', gitHandlerSubmit)

