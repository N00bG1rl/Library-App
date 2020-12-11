/* Input field label animation with jQuery */
$('input').on('focusin', function() {
  $(this).parent().find('label').addClass('active');
});

$('input').on('focusout', function() {
  if (!this.value) {
    $(this).parent().find('label').removeClass('active');
  }
});

/* OVERLAY */
let openBtn = document.getElementById('openBtn');
let closeBtn = document.getElementById('closeBtn');
let overlay = document.getElementById('overlay');
let body = document.getElementsByTagName('body')[0];

openBtn.onclick = function() {
  overlay.style.display = 'block';
  body.style.overflow = 'hidden';
  closeBtn.classList.add('closeBtnActive');
  openBtn.classList.remove('openBtnActive');
};

function closeOverlay() {
  overlay.style.display = 'none';
  body.style.overflow = 'auto';
  openBtn.classList.add('openBtnActive');
  closeBtn.classList.remove('closeBtnActive')
}
closeBtn.addEventListener('click', closeOverlay);

/* BOOK LIBRARY */
/* If local storage has items than diplay them. Otherwise display empty array */
let data = (localStorage.getItem('bookList')) ? JSON.parse(localStorage.getItem('bookList')):[];

/* Created Book constructor */
function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
};

/* Complete and remove icons in svg format */
let completeSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px"><path class="fill" d="M 22.59375 3.5 L 8.0625 18.1875 L 1.40625 11.5625 L 0 13 L 8.0625 21 L 24 4.9375 Z"/></svg>';
let removeSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px"><path class="fill" d="M 10.3125 -0.03125 C 8.589844 -0.03125 7.164063 1.316406 7 3 L 2 3 L 2 5 L 6.96875 5 L 6.96875 5.03125 L 17.03125 5.03125 L 17.03125 5 L 22 5 L 22 3 L 17 3 C 16.84375 1.316406 15.484375 -0.03125 13.8125 -0.03125 Z M 10.3125 2.03125 L 13.8125 2.03125 C 14.320313 2.03125 14.695313 2.429688 14.84375 2.96875 L 9.15625 2.96875 C 9.296875 2.429688 9.6875 2.03125 10.3125 2.03125 Z M 4 6 L 4 22.5 C 4 23.300781 4.699219 24 5.5 24 L 18.59375 24 C 19.394531 24 20.09375 23.300781 20.09375 22.5 L 20.09375 6 Z M 7 9 L 8 9 L 8 22 L 7 22 Z M 10 9 L 11 9 L 11 22 L 10 22 Z M 13 9 L 14 9 L 14 22 L 13 22 Z M 16 9 L 17 9 L 17 22 L 16 22 Z"/></svg>';

/* Get local storage items */
renderBookList();

/* When 'add' button is clicked and there are values, add content to HTML and data array */
document.getElementById('add').addEventListener('click', function() {
  /* Get input values */
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;

  if (title && author && pages) {
    /* Run function to display items */
    addItemtoDOM(title, author, pages);

    /* Resets input field */
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('pages').value = "";

    /* Close overlay after submit/add button is clicked */
    closeOverlay();

    let newBook = new Book(title, author, pages);
    /* Store content into data array */
    data.push(newBook);

    /* Update local storage */
    dataObjectUpdated();
  }
});

/* Loop through local storage if there is items and display them */
function renderBookList() {
  if (!data.length) return;

  data.forEach((book)=>addItemtoDOM(book.title,book.author,book.pages));
}

/* Update local storage */
function dataObjectUpdated() {
  localStorage.setItem('bookList', JSON.stringify(data));
};

/* Delete book from list */
function removeItem() {
  let item = this.parentNode.parentNode;
  let parent = item.parentNode;
  /* let id = parent.id; */
  let value = data[item.dataset.id];

  data.splice(data.indexOf(value), 1);
  
/*   if (id === 'unreadList') {
    data.splice(data.indexOf(value), 1);
  } else {
    data.splice(data.indexOf(value), 1);
  } */
  
  parent.removeChild(item);

  /* Update local storage */
  dataObjectUpdated();
};

/* Mark as readed book */
function completeItem() {
  let item = this.parentNode.parentNode;
  let parent = item.parentNode;
  let id = parent.id;
  /* let value = data.unread[item.dataset.id]; */

  /* Toggle between readed/unread and push to data array */
/*   if (id === 'unreadList') {
    data.readed.push(value);
    data.unread.splice(data.unread.indexOf(value), 1);
    
  } else {
    data.readed.splice(data.readed.indexOf(value), 0);
    data.unread.push(value);
  } */

  /* Check if the item should be added to the readed list or to re-added to unread list */
  let target = (id === 'unreadList') ? document.getElementById('readedList'):document.getElementById('unreadList');
  
  /* Remove from readed list */
  parent.removeChild(item);
  /* Re-add to unreadList */
  target.insertBefore(item, target.childNodes[0]);

  /* Update local storage */
  dataObjectUpdated();
};

function addItemtoDOM(title, author, pages) {
  /* Get unread ul list from html */
  let list = document.getElementById('unreadList');

  /* let list = (readed) ? document.getElementById('readedList'):document.getElementById('unreadList'); */

  let item = document.createElement('li');

  item.dataset.id = data.length;
  /* item.dataset.id = data.unread.length + data.readed.length; */
   
  let content = document.createElement('div');
  content.classList.add('book');

  let h3 = document.createElement('h3');
  h3.innerText = title;

  let span = document.createElement('span');
  span.innerHTML = '<strong>By: </strong>' + author;

  let h5 = document.createElement('h5');
  h5.innerHTML = pages + ' pages';

  let buttons = document.createElement('div');
  buttons.classList.add('bookBtns');

  let complete = document.createElement('button');
  complete.classList.add('complete');
  complete.innerHTML = completeSVG;

  /* Add click event to add the item readed list */
  complete.addEventListener('click', completeItem);

  let remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = removeSVG;

  /* Add click event to remove the item */
  remove.addEventListener('click', removeItem);

  content.appendChild(h3);
  content.appendChild(span);
  content.appendChild(h5);
  
  buttons.appendChild(complete);
  buttons.appendChild(remove);
  
  item.appendChild(content);
  item.appendChild(buttons);

  /* Insert new book before first child nodes */
  list.insertBefore(item, list.childNodes[0]);
}