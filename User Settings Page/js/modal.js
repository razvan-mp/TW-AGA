function addModal(){
    let trigger = document.querySelector(`[data-popup-trigger="orice"]`)
    trigger.addEventListener('click', () => {
        console.log(trigger)
        let popupModal = document.querySelector(`[data-popup-modal="orice"]`)

        popupModal.classList.add('is--visible')
        document.querySelector('.body-blackout').classList.add('is-blacked-out')

        popupModal.querySelector('.popup-modal__close').addEventListener('click', () => {
            popupModal.classList.remove('is--visible')
            document.querySelector('.body-blackout').classList.remove('is-blacked-out')
        })

        document.querySelector('.body-blackout').addEventListener('click', () => {
            popupModal.classList.remove('is--visible')
            document.querySelector('.body-blackout').classList.remove('is-blacked-out')
        })
    })
}
window.onload = addModal
