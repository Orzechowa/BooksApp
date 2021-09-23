{
  'use strict'
  
  const select = {
    templateOf: {
      books: '#template-book',
    },
    list: {
      booksList: '.books-list',
      filters: '.filters',
    },
    books: {
      bookImage: '.books-list .book__image',  
    }
  };

  const classNames = {
    books: {
      favoriteBook: 'favorite',
    }
  };
    
  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };
  class BooksList {
    constructor(){

      }
    initData(){
        this.data = dataSource.books;
    }

    getElements(){

    }
  
    render() {
    const booksList = document.querySelector(select.list.booksList);
      
        for(let eachBookdata of dataSource.books){
            const generatedHTML = templates.book(eachBookdata);
            const generatedDOM = utils.createDOMFromHTML(generatedHTML);
            const ratingBgc = determineRatingBgs(eachBookdata.rating);
            const ratingWidth = eachBookdata.rating * 10;
            booksList.appendChild(generatedDOM);
        }
    }
    
    render();

    initActions() {
    const favoriteBooks = [];

    const booksImage = document.querySelectorAll(select.books.bookImage);

    for(let image of booksImage){
      image.addEventListener('dblclick', function(event){
        event.preventDefault();
        const idBook = image.getAttribute('data-id');
        if(!favoriteBooks.includes(idBook)){
          event.target.offsetParent.classList.add(classNames.books.favoriteBook);
          favoriteBooks.push(idBook);
        } else {
          event.target.offsetParent.classList.remove(classNames.books.favoriteBook);
          const index = favoriteBooks.indexOf(idBook);
          favoriteBooks.splice(index, 1); 
        }
      });
    }
    
    const booksFiltered = document.querySelector(select.list.filters);
    booksFiltered.addEventListener('change', function(event){
      event.preventDefault();
      if(event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter'){
        if(event.target.checked){
          filters.push(event.target.value);
        } else {
          filters.splice(filters.indexOf(event.target.value), 1);
        }

      }
      filterBooks();
    });
  }
  initActions();

  const filters = [];

  filterBooks(){
      for(let eachBookdata of dataSource.books){
          let shouldBeHidden = false;
          for(const filter of filters){
              if(!eachBookdata.details[filter]){
                  shouldBeHidden = true;
                  break;
              }
          }
          const bookCover = document.querySelector('.book__image[data-id="' + eachBookdata.id + '"]');
          if(shouldBeHidden){
          
          bookCover.classList.add('hidden');
        } else{
          bookCover.classList.remove('hidden');
        }
       }
    
    }

    determineRatingBgs(rating){
        let background = '';
        if(rating < 6){
            background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
        }else if(rating > 6 && rating <= 8){
            background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
        }else if(rating > 8 && rating <= 9){
            background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
        }else if(rating > 9){
            background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
        }
        return background;


        }
    }

    const app = new BooksList();
}
 

  


