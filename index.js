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
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
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
  const shoppingListItemsString = generateShoppingItemsString(STORE);

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

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);