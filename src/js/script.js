{
  'use strict';
  
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
      const thisBooksList = this;
        
      thisBooksList.initData();
      thisBooksList.renderInBooks();
      thisBooksList.getElements();
      thisBooksList.initActions();     
    }
    initData(){
      this.data = dataSource.books;
    }

    getElements(){
      const thisBooksList = this;

      thisBooksList.booksList = document.querySelector(select.list.booksList);
      thisBooksList.booksImage = document.querySelectorAll(select.books.bookImage);
      thisBooksList.booksFiltered = document.querySelector(select.list.filters);
      thisBooksList.filters = [];
      thisBooksList.favoriteBooks = [];

    }
  
    renderInBooks() {
      
      const thisBooksList = this;
        
      
      for(let eachBookdata of dataSource.books){
        const generatedHTML = templates.book(eachBookdata);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        const ratingBgc = thisBooksList.determineRatingBgs(eachBookdata.rating);
        const ratingWidth = eachBookdata.rating * 10;
        thisBooksList.booksList.appendChild(generatedDOM);
      }
    
    }
    

    initActions() {
      const thisBooksList = this;

      for(let image of thisBooksList.booksImage){
        image.addEventListener('dblclick', function(event){
          event.preventDefault();
          const idBook = image.getAttribute('data-id');
          if(!thisBooksList.favoriteBooks.includes(idBook)){
            event.target.offsetParent.classList.add(classNames.books.favoriteBook);
            thisBooksList.favoriteBooks.push(idBook);
          } else {
            event.target.offsetParent.classList.remove(classNames.books.favoriteBook);
            const index = thisBooksList.favoriteBooks.indexOf(idBook);
            thisBooksList.favoriteBooks.splice(index, 1); 
          }
        });
      }
    
    
      thisBooksList.booksFiltered.addEventListener('change', function(event){
        event.preventDefault();
        if(event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter'){
          if(event.target.checked){
            thisBooksList.filters.push(event.target.value);
          } else {
            thisBooksList.filters.splice(thisBooksList.filters.indexOf(event.target.value), 1);
          }

        }
        thisBooksList.filterBooks();
      });
    }



    filterBooks(){
      const thisBooksList = this;

      for(let eachBookdata of thisBooksList.dataSource.books){
        let shouldBeHidden = false;
        for(const filter of thisBooksList.filters){
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
 

  


