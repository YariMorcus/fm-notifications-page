/**
 * Provides all functionality for the application
 * @property {HTML5Element} body - body element
 * @property {Element} notificationsContainer - notifications container element
 * @property {Element} unreadCountElem - unread count element
 * @property {Element} readButton - the Mark all as read button
 * @version 1.0.0
 * @author "Yari Morcus"
 */
class App {
  #body = document.body;

  #notificationsContainer = document.querySelector('.notifications');

  #unreadCountElem = this.#notificationsContainer.querySelector(
    '.notifications__unread-count'
  );

  #readButton = this.#notificationsContainer.querySelector(
    '.notifications__button'
  );

  constructor() {
    // indicate that JS is available.
    // This prevents the fallback (checkboxes) to be shown
    this.#body.classList.add('js');

    // Controller for marking an individual notification as read
    this.#addHandlerClickNotification();

    // Controller for marking ALL notification as read
    this.#addHandlerClickReadButton();
  }

  /**
   * Function is used as the controller for marking an individual notification
   * as read
   * @this {Object} App instance
   */
  #addHandlerClickNotification() {
    this.#notificationsContainer.addEventListener('click', e => {
      const notification = e.target.closest('.notification');

      if (!notification) return;

      this.#indicateRead(notification);
    });
  }

  /**
   * Function is used as the controller for marking ALL notifications as read
   * @this {Object} App instance
   */
  #addHandlerClickReadButton() {
    this.#readButton.addEventListener('click', () => {
      const NOTIFICATIONS =
        this.#notificationsContainer.querySelectorAll('.notification');

      NOTIFICATIONS.forEach(notification => {
        notification.classList.remove('notification--unread');
      });

      this.#resetUnreadCount();
    });
  }

  /**
   * Indicate that notification is read
   * @this {Object} App instance
   */
  #indicateRead(notification) {
    notification.classList.remove('notification--unread');

    this.#decreaseUnreadCount();
  }

  /**
   * Decrease current counter value with one
   * @this {Object} App instance
   */
  #decreaseUnreadCount() {
    const CUR_NUMBER = Number(this.#unreadCountElem.innerText);
    const NEW_NUMBER = CUR_NUMBER - 1;

    // Prevent counter from going below 0
    if (CUR_NUMBER === 0) return;

    this.#unreadCountElem.innerText = NEW_NUMBER;
  }

  /**
   * Reset unread count to zero
   * @this {Object} App instance
   */
  #resetUnreadCount() {
    this.#unreadCountElem.innerText = 0;
  }
}

// Initiate App
const app = new App();
