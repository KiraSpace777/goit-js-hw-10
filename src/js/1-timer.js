// ------------------------------------------------
// 1) Бібліотека flatpickr - щоб підключити CSS код бібліотеки в проєкт, необхідно додати ще один імпорт, крім того, що описаний в документації.
// ------------------------------------------------

// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//   },
// };

// ------------------------------------------------
// 2) Бібліотека iziToast - щоб підключити CSS код бібліотеки в проєкт, необхідно додати ще один імпорт, крім того, що описаний в документації.
// ------------------------------------------------

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// ------------------------------------------------

const datetimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

class Timer {
  constructor() {
    this.userSelectedDate = null;
    this.intervalId = null;
    this.options = {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose: this.handleDateSelect.bind(this),
      //   onClose(selectedDates) {
      //     console.log(selectedDates[0]);
      //   },
    };
    this.init();
  }

  init() {
    flatpickr(datetimePicker, this.options); // Ініціалізація flatpickr
    startBtn.addEventListener('click', this.startTimer.bind(this)); // Слухач на кнопку
    startBtn.disabled = true; // Деактивуємо кнопку при завантаженні сторінки
  }

  handleDateSelect(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();

    if (!selectedDate || selectedDate <= now) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        messageSize: '16px',
      });
      startBtn.disabled = true;
    } else {
      this.userSelectedDate = selectedDate;
      startBtn.disabled = false;
    }
  }

  startTimer() {
    startBtn.disabled = true;
    datetimePicker.disabled = true;

    this.intervalId = setInterval(() => {
      const now = new Date();
      const timeLeft = this.userSelectedDate - now;

      if (timeLeft <= 0) {
        clearInterval(this.intervalId);
        this.updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        datetimePicker.disabled = false;
        return;
      }

      const time = this.convertMs(timeLeft);
      this.updateTimerDisplay(time);
    }, 1000);
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
  }

  updateTimerDisplay({ days, hours, minutes, seconds }) {
    document.querySelector('[data-days]').textContent =
      this.addLeadingZero(days);
    document.querySelector('[data-hours]').textContent =
      this.addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent =
      this.addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent =
      this.addLeadingZero(seconds);
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

new Timer();

// ------------------------------------------------

// -----------------------------------------------
// Завдання 1 - Таймер зворотного відліку
// -----------------------------------------------

// Виконуй це завдання у файлах 1-timer.html і 1-timer.js. Напиши скрипт таймера, який здійснює зворотний відлік до певної дати. Такий таймер може використовуватися у блогах, інтернет-магазинах, сторінках реєстрації подій, під час технічного обслуговування тощо. Подивися демовідео роботи таймера.
// ------------------------
// Елементи інтерфейсу
// ------------------------
// Додай в HTML файл розмітку таймера, поля вибору кінцевої дати і кнопку, при кліку на яку таймер повинен запускатися. Додай оформлення елементів інтерфейсу згідно з макетом.
// ------------------------------------------------
// <input type="text" id="datetime-picker" />
// <button type="button" data-start>Start</button>

// <div class="timer">
//   <div class="field">
//     <span class="value" data-days>00</span>
//     <span class="label">Days</span>
//   </div>
//   <div class="field">
//     <span class="value" data-hours>00</span>
//     <span class="label">Hours</span>
//   </div>
//   <div class="field">
//     <span class="value" data-minutes>00</span>
//     <span class="label">Minutes</span>
//   </div>
//   <div class="field">
//     <span class="value" data-seconds>00</span>
//     <span class="label">Seconds</span>
//   </div>
// </div>
// ------------------------------------------------

// ------------------------
// Бібліотека flatpickr
// ------------------------
// Використовуй бібліотеку flatpickr для того, щоб дозволити користувачеві кросбраузерно вибрати кінцеву дату і час в одному елементі інтерфейсу. Для того щоб підключити CSS код бібліотеки в проєкт, необхідно додати ще один імпорт, крім того, що описаний в документації.

// https://flatpickr.js.org/
// ------------------------------------------------
// 1) ТЕРМИНАЛ - Installation - :
// ------------------------------------------------
// # using npm install
// npm i flatpickr --save
// ------------------------------------------------
// 2) JS - usage (import)
// ------------------------------------------------
// // Описаний в документації
// import flatpickr from "flatpickr";
// // Додатковий імпорт стилів
// import "flatpickr/dist/flatpickr.min.css";
// ------------------------------------------------
// 2) JS - usage (create flatpickr instance)
// ------------------------------------------------
// // If using flatpickr in a framework, its recommended to pass the element directly
// flatpickr(element, {});
// ----------------
// // Otherwise, selectors are also supported
// flatpickr("#myID", {});
// ----------------
// // creates multiple instances
// flatpickr(".anotherSelector");
// ------------------------------------------------
// Бібліотека очікує, що її ініціалізують на елементі input[type="text"], тому ми додали до HTML документа поле input#datetime-picker.
// ------------------------------------------------
// <input type="text" id="datetime-picker" />
// ------------------------------------------------

// Другим аргументом функції flatpickr(selector, options) можна передати необов'язковий об'єкт параметрів. Ми підготували для тебе об'єкт, який потрібен для виконання завдання. Розберися, за що відповідає кожна властивість у документації «Options» і використовуй його у своєму коді.
// ------------------------------------------------
// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//   },
// };
// ------------------------------------------------

// ------------------------
// Вибір дати
// ------------------------
// Метод onClose() з об'єкта параметрів викликається щоразу під час закриття елемента інтерфейсу, який створює flatpickr. Саме в ньому варто обробляти дату, обрану користувачем. Параметр selectedDates — це масив обраних дат, тому ми беремо перший елемент selectedDates[0].

// Тобі ця обрана дата буде потрібна в коді і поза межами цього методу onClose(). Тому оголоси поза межами методу let змінну, наприклад, userSelectedDate, і після валідації її в методі onClose() на минуле/майбутнє запиши обрану дату в цю let змінну.

// Якщо користувач вибрав дату в минулому, покажи window.alert() з текстом "Please choose a date in the future" і зроби кнопку «Start» не активною.
// Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.
// Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому. Зверни увагу, що при обранні валідної дати, не запуску таймера і обранні потім невалідної дати, кнопка після розблокування має знову стати неактивною.
// Натисканням на кнопку «Start» починається зворотний відлік часу до обраної дати з моменту натискання.

// ------------------------
// Відлік часу
// ------------------------
// Натисканням на кнопку «Start» скрипт повинен обчислювати раз на секунду, скільки часу залишилось до вказаної дати, і оновлювати інтерфейс таймера, показуючи чотири цифри: дні, години, хвилини і секунди у форматі xx:xx:xx:xx.

// Кількість днів може складатися з більше, ніж двох цифр.
// Таймер повинен зупинятися, коли дійшов до кінцевої дати, тобто залишок часу дорівнює нулю 00:00:00:00.

// Після запуску таймера натисканням кнопки Старт кнопка Старт і інпут стають неактивним, щоб користувач не міг обрати нову дату, поки йде відлік часу. Після зупинки таймера інпут стає активним, щоб користувач міг обрати наступну дату. Кнопка залишається не активною.

// Для підрахунку значень використовуй готову функцію convertMs, де ms — різниця між кінцевою і поточною датою в мілісекундах.
// ------------------------------------------------
// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }
// ------------------------------------------------

// ------------------------
// Форматування часу
// ------------------------
// Функція convertMs() повертає об'єкт з розрахованим часом, що залишився до кінцевої дати. Зверни увагу, що вона не форматує результат. Тобто якщо залишилося 4 хвилини або будь-якої іншої складової часу, то функція поверне 4, а не 04. В інтерфейсі таймера необхідно додавати 0, якщо в числі менше двох символів. Напиши функцію, наприклад addLeadingZero(value), яка використовує метод рядка padStart() і перед відмальовуванням інтерфейсу форматує значення.

// ------------------------
// Бібліотека повідомлень
// ------------------------
// Для відображення повідомлень користувачеві, замість window.alert(), використовуй бібліотеку iziToast. Для того щоб підключити CSS код бібліотеки в проєкт, необхідно додати ще один імпорт, крім того, що описаний у документації.
// ------------------------------------------------
// // Описаний у документації
// import iziToast from "izitoast";
// // Додатковий імпорт стилів
// import "izitoast/dist/css/iziToast.min.css";
// ------------------------------------------------
// ------------------------------------------------
// 1	npm install izitoast --save

// HTML › Include the CSS files from the dist folder in the head section:
// 1	<!-- <link rel="stylesheet" href="iziToast.min.css"> -->
// ________________________________________
// HTML › Include the JS file before the scripts
// 1	<!-- <script src="iziToast.min.js" type="text/javascript"></script> -->
// ________________________________________
// JS › Basic example
// iziToast.show({
//     title: 'Hey',
//     message: 'What would you like to add?'
// });
// ------------------------------------------------
// На що буде звертати увагу ментор при перевірці:
// ------------------------------------------------
// Підключені бібліотеки flatpickr та iziToast.
// При першому завантаженні сторінки кнопка Start не активна.
// При кліку на інпут відкривається календар, де можна вибрати дату.
// При обранні дати з минулого, кнопка Start стає неактивною і з’являється повідомлення з текстом "Please choose a date in the future".
// При обранні дати з майбутнього кнопка Start стає активною.
// При натисканні на кнопку Start вона стає неактивною, на сторінку виводиться час, що лишився до обраної дати у форматі xx:xx:xx:xx, і запускається зворотний відлік часу до обраної дати.
// Кожну секунду оновлюється інтерфейс і показує оновлені дані часу, який залишився.
// Таймер зупиняється, коли доходить до кінцевої дати, тобто залишок часу дорівнює нулю і інтерфейс виглядає так 00:00:00:00.
// Час в інтерфейсі відформатований і, якщо воно містить менше двох символів, на початку числа доданий 0.
