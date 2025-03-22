import Game from '../components/Game';

import { CharacterList } from '../lib/CharacterList';

function MainPage() {
  return (
    <>
      <div className='page-container'>
        <div>汉字Go</div>
        <Game list={CharacterList} />
      </div>
    </>
  );
}

export default MainPage;
