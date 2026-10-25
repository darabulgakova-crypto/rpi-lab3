export default function Header() {
  return <header><nav aria-label="Основная навигация">{[['home','Главная'],['partners','Партнеры'],['about','О нас'],['lecturers','Лекторы']].map(([id,label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav></header>;
}
