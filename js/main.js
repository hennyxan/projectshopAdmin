import { Product } from './product.js';
import { Cart } from './cart.js';
import { Popup } from './popup.js';

document.addEventListener('DOMContentLoaded', function () {
    const products = [
        new Product(1, 'ASUS TUF GAMING 15 ',800, 'image1.jpg', 'Intel Core i5-12450H, 4.4GHz, 15.6" Full HD, 120Hz,16GB, SSD 512GB, NVIDIA GeForce RTX 3050 Ti 4GB, DOS, Onyx Grey'),
        new Product(2, 'Apple MacBook Air 13 ', 1199, 'image2.jpg', ' MacBook Air, 13" displej, Apple M1 čip, 8-core CPU 7-core GPU procesor, pamäť 8 GB, 256 GB SSD disk, FaceTime HD kamera, Silver SK '),
        new Product(3, 'SAMSUNG UE553 (2023)', 499, 'image3.jpg', '4K Ultra HD, 3840x2160, OS TV: Tizen, DVB-S2, DVB-C, DVB-T2/H.265, 3 × HDMI port, HDMI 2.1, 1 × USB 2.0, 0 × USB 3.0, Bluetooth, Wi-Fi, Ethernet/LAN pripojenie, HbbTV"'),
        new Product(4, 'Xiaomi 13T 8/256GB Black', 399, 'image4.jpg', 'Intel Core i5-12500H, 4.5GHz, 15.6" Full HD, 144Hz, 8GB, SSD 512GB, NVIDIA GeForce RTX 4050 6GB'),
        new Product(5, 'PLAYSTATION 5', 550, 'image5.jpg', 'Herná konzola, Platforma: PS5, Farba: biela, Kapacita: 1000 GB, Optická mechanika: Blu-ray", Operačná pamäť RAM: 16 GB, Typ vnútornej pamäte: GDDR6'),
        new Product(6, 'DELONGHI ECAM', 469, 'image6.jpg', 'Automatic espresso, Espresso machine type: espresso - fully automatic, Smart mobile control: No, Maximum operating pressure: 15 Bar, Ground coffee: Yes, Foam preparation method: milk container, Water reservoir capacity: 1800 ml'),
    ];

    const cart = new Cart();
    const popup = new Popup();

    function renderProducts(products) {
        const appElement = document.getElementById('app');
        appElement.innerHTML = '';

        products.forEach(product => {
            const productContainer = document.createElement('div');
            productContainer.classList.add('product-container');

            const imageElement = document.createElement('img');
            imageElement.src = product.imageUrl;
            imageElement.alt = product.name;
            imageElement.title = product.description;
            imageElement.classList.add('product-image');

            imageElement.addEventListener('click', () => {
                alert(product.description);
            });

            const nameElement = document.createElement('p');
            nameElement.textContent = product.name;

            const priceElement = document.createElement('p');
            priceElement.textContent = `€${product.price}`;

            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Добавить в корзину';
            addToCartButton.classList.add('add-to-cart-btn');

            addToCartButton.addEventListener('click', () => {
                addProductToCart(product);
            });

            productContainer.appendChild(imageElement);
            productContainer.appendChild(nameElement);
            productContainer.appendChild(priceElement);
            productContainer.appendChild(addToCartButton);

            appElement.appendChild(productContainer);
        });
    }

    function addProductToCart(product) {
        cart.addItem(product);
        popup.showPopup(`Добавлен товар: ${product.name} в корзину.`);
        renderCart();
    }

    function removeProductFromCart(product) {
        cart.removeItem(product);
        renderCart();
    }

    function renderCart() {
        const cartItemsElement = document.getElementById('cart-items');
        const cartIcon = document.getElementById('cart-icon');
    
        cartItemsElement.innerHTML = '';
    
        if (cart.items.length === 0) {
            const emptyCartMessage = document.createElement('p');
            emptyCartMessage.textContent = 'Корзина пуста';
            cartItemsElement.appendChild(emptyCartMessage);
        } else {
            cart.items.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
    
                const itemImage = document.createElement('img');
                itemImage.src = item.product.imageUrl;
                itemImage.alt = item.product.name;
    
                const itemDetails = document.createElement('div');
                itemDetails.classList.add('item-details');
    
                const itemName = document.createElement('span');
                itemName.textContent = item.product.name;
    
                const itemQuantity = document.createElement('span');
                itemQuantity.textContent = `Количество: ${item.quantity}`;
    
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Убрать';
                removeButton.classList.add('remove-from-cart-btn');
    
                removeButton.addEventListener('click', () => {
                    removeProductFromCart(item.product);
                });
    
                itemDetails.appendChild(itemName);
                itemDetails.appendChild(itemQuantity);
    
                cartItem.appendChild(itemImage);
                cartItem.appendChild(itemDetails);
                cartItem.appendChild(removeButton);
    
                cartItemsElement.appendChild(cartItem);
            });
    
            const totalPriceElement = document.createElement('p');
            totalPriceElement.textContent = `Итого: $${cart.getTotalPrice()}`;
            cartItemsElement.appendChild(totalPriceElement);
        }
    
        const clearCartBtn = document.createElement('button');
        clearCartBtn.textContent = 'Убрать все';
        clearCartBtn.classList.add('clear-cart-btn');
        clearCartBtn.addEventListener('click', () => {
            clearCart();
        });

        cartItemsElement.appendChild(clearCartBtn);

        cartItemsElement.style.display = cart.items.length > 0 ? 'block' : 'none';
        cartIcon.textContent = cart.items.length.toString();
        cart.saveToLocalStorage();
        popup.showPopup(cartItemsElement.name);
    }

    function clearCart() {
        cart.clearCart();
        renderCart();
    }

    const cartIcon = document.getElementById('cart-icon');
    cartIcon.addEventListener('click', () => {
        renderCart();
    });

    renderProducts(products);
    renderCart();

    // Логика регистрации
    document.getElementById('registration-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

       
        alert(`Пользователь зарегистрирован: ${username}`);
    });

    const isAdmin = confirm('А вы админ?)');

if (isAdmin) {
    const enteredPassword = prompt('Я вам верю; Пароль:admin :)');

    // Проверка пароля
    if (enteredPassword === 'admin') {
        
        const adminPanelLink = document.createElement('a');
        adminPanelLink.href = '#'; // Укажите путь к админ-панели
        adminPanelLink.textContent = 'Админ Панель';
        adminPanelLink.addEventListener('click', function () {
            openAddProductForm();
        });

        
        document.body.appendChild(adminPanelLink);
    } else {
        alert('Упс! Похоже все таки вы не админ ^^.');
    }
}

    function openAddProductForm() {
        const form = document.createElement('form');
        form.id = 'add-product-form';

        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Что хотим продать?:';
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.id = 'product-name';
        nameInput.required = true;

        const priceLabel = document.createElement('label');
        priceLabel.textContent = 'Цена:';
        const priceInput = document.createElement('input');
        priceInput.type = 'number';
        priceInput.id = 'product-price';
        priceInput.required = true;

        const imageUrlLabel = document.createElement('label');
        imageUrlLabel.textContent = 'Укажите адрес фотографии:';
        const imageUrlInput = document.createElement('input');
        imageUrlInput.type = 'text';
        imageUrlInput.id = 'product-image-url';
        imageUrlInput.required = true;

        const descriptionLabel = document.createElement('label');
        descriptionLabel.textContent = 'Опишите товар:';
        const descriptionInput = document.createElement('textarea');
        descriptionInput.id = 'product-description';
        descriptionInput.required = true;

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Добавить товар';

        form.appendChild(nameLabel);
        form.appendChild(nameInput);
        form.appendChild(priceLabel);
        form.appendChild(priceInput);
        form.appendChild(imageUrlLabel);
        form.appendChild(imageUrlInput);
        form.appendChild(descriptionLabel);
        form.appendChild(descriptionInput);
        form.appendChild(submitButton);

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const productName = nameInput.value;
            const productPrice = parseFloat(priceInput.value);
            const productImageUrl = imageUrlInput.value;
            const productDescription = descriptionInput.value;

            const newProduct = new Product(products.length + 1, productName, productPrice, productImageUrl, productDescription);
            products.push(newProduct);

            closeAddProductForm();

            renderProducts(products);
            alert(`Товар "${productName}" добавлен.`);
        });

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Закрыть';
        closeButton.addEventListener('click', function () {
            closeAddProductForm();
        });

        form.appendChild(closeButton);

        document.body.appendChild(form);
    }

    function closeAddProductForm() {
        const addProductForm = document.getElementById('add-product-form');
        if (addProductForm) {
            addProductForm.remove();
        }
    }
});