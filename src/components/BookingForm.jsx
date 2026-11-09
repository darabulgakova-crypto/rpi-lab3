import { useEffect, useRef, useState, useId } from 'react';

export default function BookingForm({ selection, onClose }) {
  const dialog = useRef(null); 
  const [done, setDone] = useState(false); 
  const formId = useId(); // Уникальный префикс для ID полей

  useEffect(() => {
    const element = dialog.current;
    element.showModal();
    return () => element.close();
  }, []);

  return (
    <dialog 
      ref={dialog} 
      onCancel={onClose} 
      onClick={event => {if (event.target === event.currentTarget) onClose();}} 
      aria-labelledby="booking-title"
    >
      <button className="close" aria-label="Закрыть" onClick={onClose}>×</button>
      <h2 id="booking-title">Запись на занятие</h2>
      <p>{selection.lecturer.name}</p>
      <p>{selection.tariff}</p>

      {done ? (
        <div role="status">
          <p>Заявка сформирована. Это учебная демонстрация: данные никуда не отправлены.</p>
          <button onClick={onClose}>Готово</button>
        </div>
      ) : (
        <form onSubmit={event => {event.preventDefault(); setDone(true);}}>
          
          {/* Поле 1: Имя */}
          <div>
            <label htmlFor={`${formId}-name`}>Ваше имя</label>
            <input 
              id={`${formId}-name`} 
              name="name" 
              autoComplete="name" 
              required 
              maxLength={80} 
              pattern=".*\S.*" 
            />
          </div>

          {/* Поле 2: Почта */}
          <div>
            <label htmlFor={`${formId}-email`}>Электронная почта</label>
            <input 
              id={`${formId}-email`} 
              name="email" 
              autoComplete="email" 
              type="email" 
              required 
            />
          </div>

          {/* Поле 3: Формат */}
          <div>
            <label htmlFor={`${formId}-format`}>Формат</label>
            <select id={`${formId}-format`} name="format">
              <option>Онлайн</option>
              <option>Оффлайн — согласовать место</option>
            </select>
          </div>

          {/* Поле 4: Комментарий */}
          <div>
            <label htmlFor={`${formId}-message`}>Комментарий</label>
            <textarea 
              id={`${formId}-message`} 
              name="message" 
              maxLength={1000} 
            />
          </div>

          <button type="submit">Сформировать заявку</button>
          <small>Учебная форма без отправки данных и оплаты.</small>
        </form>
      )}
    </dialog>
  );
}