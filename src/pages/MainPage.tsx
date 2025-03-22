import Game from "../components/Game";
import { CharacterList } from "../lib/CharacterList";

function MainPage() {
    return (
        <>
        <div className="page-container">
            <Game list={CharacterList} />
        </div>
        </>
    )
}

export default MainPage;
