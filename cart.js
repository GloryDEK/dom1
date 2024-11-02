document.addEventListener('DOMContentLoaded', () => {

    // Ajout d'evenements pour les boutons plus pour tous les articles
    const plusButtons = document.querySelectorAll('.fa-plus');
    plusButtons.forEach(button => {
        button.addEventListener('click', increaseQuantite);
    });

  // Ajout d'evenements pour les boutons moins pour tous les articles
  const minusButtons = document.querySelectorAll('.fa-minus');
  minusButtons.forEach(button => {
      button.addEventListener('click', decreaseQuantite);
  });

    // Ajout d'evenements pour l'icones (heart)
    const heartButtons = document.querySelectorAll('.fa-heart');
    heartButtons.forEach(button => {
        button.addEventListener('click', toggleHeartColor);
    })

    // Fonction pour incrementer la quantité et mise à jour du prix de l'article
    function increaseQuantite(event) {
        const articleContainer = event.target.closest('.col-md-4');
        const quantityInput = articleContainer.querySelector('.qtite');
        const priceElement = articleContainer.querySelector('.price');
        const itemTotalSpan = articleContainer.querySelector('.sum');

        // Incremente la quantite
        quantityInput.value = parseInt(quantityInput.value) + 1;

        // Calculer le total pour l'article et l'afficher
        const price = parseFloat(priceElement.innerText.replace('Prix: ', '').replace('€', '').trim());
        const itemTotal = price * parseInt(quantityInput.value);
        itemTotalSpan.innerText = itemTotal.toFixed(2) + ' €';

        // Mettre à jour le prix total général
        updateCartTotal();
    }

    // Fonction pour décrémenter la quantité et mettre à jour le prix de l'article
    function decreaseQuantite(event) {
        const articleContainer = event.target.closest('.col-md-4');
        const quantityInput = articleContainer.querySelector('.qtite');
        const priceElement = articleContainer.querySelector('.price');
        const itemTotalSpan = articleContainer.querySelector('.sum');

   // Décrémenter la quantité uniquement si elle est supérieure à 1
   if (parseInt(quantityInput.value) > 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;

    // Calculer le total pour l'article et l'afficher
    const price = parseFloat(priceElement.innerText.replace('Prix: ', '').replace('€', '').trim());
    const itemTotal = price * parseInt(quantityInput.value);
    itemTotalSpan.innerText = itemTotal.toFixed(2) + ' €';

    // Mettre à jour le prix total général
    updateCartTotal();
    }

}
  // Fonction pour changer la couleur de l'icône fa-heart lorsqu'on clique dessus
  function toggleHeartColor(event) {
    const heartIcon = event.target;
    if (heartIcon.style.color === 'red') {
        heartIcon.style.color = ''; // Remise de la couleur initiale
    } else {
        heartIcon.style.color = 'red'; // Changer la couleur en rouge
    }
}

    // Fonction pour calculer le prix total général
    function updateCartTotal() {
        const itemTotals = document.querySelectorAll('.sum');
        let grandTotal = 0;

        itemTotals.forEach(item => {
            const itemPrice = parseFloat(item.innerText.replace('€', '').trim());
            if (!isNaN(itemPrice)) {
                grandTotal += itemPrice;
            }
        });

        // Afficher le prix total général
        const totalSpan = document.getElementById('total').querySelector('span');
        totalSpan.innerText = '€' + grandTotal.toFixed(2);
    }

    // Ajout d'événements pour le changement de quantité
    const quantiteInputs = document.querySelectorAll('.qtite');
    quantiteInputs.forEach(input => {
        input.addEventListener('change', quantiteChanged);
    });

    function quantiteChanged(event) {
        const input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        const articleContainer = input.closest('.col-md-4');
        const priceElement = articleContainer.querySelector('.price');
        const itemTotalSpan = articleContainer.querySelector('.sum');

        // Calculer le total pour l'article et l'afficher
        const price = parseFloat(priceElement.innerText.replace('Prix: ', '').replace('€', '').trim());
        const itemTotal = price * parseInt(input.value);
        itemTotalSpan.innerText = itemTotal.toFixed(2) + ' €';

        // Mettre à jour le prix total général
        updateCartTotal();
    }

    // Ajout d'événements pour le bouton supprimer
    const removeCardItemButtons = document.querySelectorAll('.button');
    removeCardItemButtons.forEach(button => {
        button.addEventListener('click', removeCartItem);
    });

    function removeCartItem(event) {
        const buttonClicked = event.target;
        buttonClicked.closest('.col-md-4').remove();
        updateCartTotal();  // Mise à jour total apres suppression
    }

});

