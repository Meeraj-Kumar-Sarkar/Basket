
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting = {
    databaseURL: "https://playground-462ed-default-rtdb.asia-southeast1.firebasedatabase.app/",
}

const app = initializeApp(appSetting);
const database = getDatabase(app)
const shoppingListDB = ref(database, "testingList")


const inputField = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list")



addButtonEl.addEventListener("click", function () {
    let inputValue = inputField.value;

    push(shoppingListDB, inputValue);

    clearInputFieldEl();

})

onValue(shoppingListDB, function (snapshot) {
    if (snapshot.exists()) {
        let itemList = Object.entries(snapshot.val()) // itemList is an array of array consist of key, value pair
        clearShoppingListEl();
        for (let item of itemList) {
            appendShoppingList(item); // This is passing each key, value pair as a single whole unit of an array
        }
    }
    else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputField.value = ""
}

function appendShoppingList(itemName) {
    let itemId = itemName[0]
    let itemValue = itemName[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    newEl.addEventListener("click", function () {
        let itemDb = ref(database, `testingList/${itemId}`)
        remove(itemDb)
        // clearShoppingListEl();
    })
    shoppingListEl.append(newEl)
}
