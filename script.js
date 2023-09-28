"use strict"

const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")
const enterTodo = document
  .getElementById("input-box")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      addTodo()
    }
  })

const dismissLoading = function () {
  document.querySelector(".loader").classList.remove("loader-active")
}

const wait2secs = function () {
  setTimeout(dismissLoading, 1000)
}

window.addEventListener("load", wait2secs)

function addTodo() {
  if (inputBox.value === "") {
    alert("Bir Todo eklemedin")
  } else {
    let li = document.createElement("li")
    li.textContent = inputBox.value
    listContainer.appendChild(li)
    let span = document.createElement("span")
    span.textContent = "\u00d7" // carpi ikonu
    li.appendChild(span)
  }
  inputBox.value = "" // input box'ı sıfırla
  saveTodos() // yeni todo eklendiginde locale storage'a kaydediyoruz
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked") // tıkladıgımızda checked classını ekleyerek üstünü ciziyoruz
      saveTodos()
    } else if (e.target.tagName === "SPAN") {
      // span etiketine yani carpiya tikladigimizda li kaldırıyoruz
      e.target.parentElement.remove()
      saveTodos()
    }
  },
  false
)

function saveTodos() {
  localStorage.setItem("todos", listContainer.innerHTML)
}

function showTodos() {
  listContainer.innerHTML = localStorage.getItem("todos")
}
showTodos()
