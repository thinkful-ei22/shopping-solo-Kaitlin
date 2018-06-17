// Code will go here
// Do a user log

'use strict';

// Create STORE array here

const STORE = [
      {name: "apples", checked: false},
      {name: "oranges", checked: false},
      {name: "milk", checked: true},
      {name: "bread", checked: false}
];

// function to create a new <li> element

function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name.toLowerCase()}</span>
      <input type="text"" name="edit-item-name" class="edit-item-box" placeholder="edit item name!">
      <button clas="edit-item-name" hidden>
        <span class="button-label">submit</span>
      </button> 
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-edit js-edit-item">
        <span class="button-label">edit</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}



// function to generate the items

function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");

  // map each item onto the page
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
  // join items together
  return items.join("");
}

// function to render the items

function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  let shoppingListItemsString;
  if (checkIt) {
   const filteredList = filterItems();
   shoppingListItemsString = generateShoppingItemsString(filteredList);
  } 
  else if (filterItCheck) {
    console.log('We made it to the top');
    shoppingListItemsString = generateShoppingItemsString(filterIt);
  } 
  else {
    shoppingListItemsString = generateShoppingItemsString(STORE);
  }
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}

// new item function

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  // push a new item to the store array
  STORE.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    // prevent the page from refreshing
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    // set the inputed word to a value 'newItemName'
    const newItemName = $('.js-shopping-list-entry').val();
    // reset the input box
    $('.js-shopping-list-entry').val('');
    // run the addItemToList function with the new value
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

// checkItem function

function toggleCheckedForListItem(itemIndex) {
  console.log("Toggling checked property for item at index " + itemIndex);
  STORE[itemIndex].checked = !STORE[itemIndex].checked;
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}


function handleDeleteItemClicked() {
    $('.shopping-list').on('click', '.shopping-item-delete', function(e){
      const idx = $(this).closest('li').attr('data-item-index');
      STORE.splice(idx, 1);
      renderShoppingList();
    });
}

// HTML for toggle button

function toggleButtonHTML() {
    return `<form id="check-toggle-button" class="check-toggle">
    <label for="toggle-check">Show only <i>unchecked</i> items: </label>
    <button type="submit">Toggle</button>
</form>`
}

// render the toggleButton

function renderToggleButton() {
    $('#checked-toggle-button').html(toggleButtonHTML());
}

// hide checked items in the array

function filterItems() {

    const filteredList = STORE.filter(item => item.checked === false);
    console.log(filteredList);    
    return filteredList;
};

// click the button to toggle between checked & unchecked

let checkIt = false;

function checkToggleButton () {
    $('#check-toggle-button').submit(function(event) {
        checkIt = !checkIt;
        // prevent the page from refreshing
        event.preventDefault();
        console.log("Checked items have been toggled.");
        // run the filter function -> change the store
        //render the shopping list;
        renderShoppingList();
    });
}

// function for editing an item name in the current list

function handleEditItemName() {
    // listen for click button
    $('.js-shopping-list').on('click', '.shopping-item-edit', function() {
        console.log('Edit Item works!');
        // Create an area for the item to be edited
        $(event.currentTarget).closest('li').find('.edit-item-box').show();
        $(event.currentTarget).closest('li').find('.edit-item-name').show();
    });
}

function handleEditItemSubmit(itemIndex) {
    $('.js-shopping-list').on('click', '.js-edit-item', function(event) {
        const editedName = $('.edit-item-box').val();
        console.log(editedName);
        const itemIndex = getItemIndexFromElement(event.currentTarget);

        if(editedName !== '') {
            STORE[itemIndex].name = editedName;
        };
        renderShoppingList();
    })
}

// I wanted to use this method but I couldn't figure out how to implement it!
// https://devdojo.com/blog/tutorials/jquery-easy-editable-text-fields

// Search and filter list by item name containing the search term


let filterItCheck = false;
let filterIt = [];

function handleSearchItems() {
    $('#js-search-list-form').submit(function(event) {
        event.preventDefault();
        console.log('Search Button Working!');

        // get search value
        let searchValue = $('.js-search-list-entry').val();
        console.log(searchValue);

        // filter the list
        const itemsFilter = STORE.filter(index => index.name.includes(searchValue));
        filterIt = itemsFilter;
        console.log(filterIt);

        filterItCheck = true;

    }); renderShoppingList();
};

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  renderToggleButton();
  checkToggleButton();
  handleEditItemName();
  handleEditItemSubmit();
  handleSearchItems();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);