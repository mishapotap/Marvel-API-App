import "./singleChar.scss";
// ОТдельная страница с локи
const SingleChar = () => {
    return (
        <div className="single-comic">
            <img src="#" alt="#" className="single-comic__char-img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">Loki</h2>
                <p className="single-comic__descr">In Norse mythology Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi deserunt dolorem maxime accusamus, aliquid quasi sint quis, enim illum minus aliquam doloribus soluta odio earum error, cum saepe. Ea assumenda nesciunt voluptate tempore nobis eos officia doloremque architecto sint quas, nostrum eius dicta sit explicabo quibusdam, ipsum blanditiis quod repudiandae!</p>
            </div>
        </div>
    );
};

export default SingleChar;
