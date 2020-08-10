 
 
 document.querySelector('body').onclick = (e) => {
    console.log('---------------------------------')
    console.log(e.target)
  }

  const quantity = document.getElementById('quantity')
  const divTotal = document.getElementById('total')

  const cart = []

  quantity.onsubmit = function(e) {
    
    
    addToCart(quantity)
    showCart()
  }

  quantity.onclick = function(e) {
    console.log(e.target)
    if (e.target && e.target.classList.contains('remove')) {
      console.log(e.target.dataset.name)
      removeFromCart(e.target.dataset.name)
    } else if (e.target && e.target.classList.contains('add-one')) {
      addToCart(e.target.dataset.name)
    } else if (e.target && e.target.classList.contains('remove-one')) {
      removeFromCart(e.target.dataset.name, 1)
    }
  }

  quantity.onchange = function(e) {
    if (e.target && e.target.classList.contains('update')) {
      const qty = parseInt(e.target.value)
      const name = e.target.dataset.name
      updateCart(name, qty)

    }
  }

  function addToCart(quantity) {
    for (let i = 0; i < cart.length; i += 1) {
      if (cart[i].name === name) {
        cart[i].qty += 1
        showCart()
        return true
      }
    }
    cart.push({ quantity, qty: 1})
    showCart()
  }

  function removeFromCart(name, qty = 0) {
    console.log(name, qty)
    for (let i = 0; i < cart.length; i += 1) {
      if (cart[i].name === name) {
        if (qty) {
          let newQty = cart[i].qty - qty
          if (newQty > 0) {
            cart[i].qty = newQty
          } else {
            cart.splice(i, 1)
          }
        } else {
          cart.splice(i, 1)
        }
      }
    }

    showCart()
  }

  function showCart() {
    let str = ''
    for (let i = 0; i < cart.length; i += 1) {
      str += `<li>
        <span>
          ${cart[i].name} ${cart[i].price} each 
          x ${cart[i].qty} = ${(cart[i].qty * cart[i].price).toFixed(2)}
        </span>
        <span>
          <button class="remove" data-name="${cart[i].name}">remove</button>
          <button class="add-one" data-name="${cart[i].name}"> + </button>
          <button class="remove-one" data-name="${cart[i].name}"> - </button>
          <input class="update" data-name="${cart[i].name}" type="number">
        </span>
      </li>`
    }
    itemsList.innerHTML = str
    divTotal.innerHTML = getTotal()
  }

  function getTotal() {
    let total = 0
    for (let i = 0; i < cart.length; i += 1) {
      total += cart[i].price * cart[i].qty
    }
    return total.toFixed(2)
  }

  function updateCart(name, qty) {
    for (let i = 0; i < cart.length; i += 1) {
      if (cart[i].name === name) {
        cart[i].qty = qty
        showCart()
        return true
      }
    }
    return false
  }
  
  showCart()

  getTotal() 
