
export const Header = () => {
  return (
    <header>
      <div className="header__top">
        <button className="header__top__button">
          <svg className="button__img" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_3_4483)">
              <path d="M4 8H8V4H4V8ZM10 20H14V16H10V20ZM4 20H8V16H4V20ZM4 14H8V10H4V14ZM10 14H14V10H10V14ZM16 4V8H20V4H16ZM10 8H14V4H10V8ZM16 14H20V10H16V14ZM16 20H20V16H16V20Z" fill="#A1A1AA" />
            </g>
            <defs>
              <clipPath id="clip0_3_4483">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <button className="header__top__button">
          <svg className="button__img" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_3_4484)">
              <path d="M10 9V5L3 12L10 19V14.9C15 14.9 18.5 16.5 21 20C20 15 17 10 10 9Z" fill="#A1A1AA" />
            </g>
            <defs>
              <clipPath id="clip0_3_4484">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <a className="header__top__link active" href="">Просмотр</a>
        <a className="header__top__link" href="">Управление</a>
      </div>

      <div className="header__bottom">
        <div className="left__switch">
          <div className="left__switch__text">
            <p className="name">Название проекта</p>
            <p className="abbreviation">Аббревиатура</p>
          </div>
          <img className="arrow" src="arrow.svg" alt="стрелка" />
        </div>
        <div className="sections">
          <button className="sections__item">Строительно-монтажные работы</button>
        </div>
      </div>
    </header>
  );
};