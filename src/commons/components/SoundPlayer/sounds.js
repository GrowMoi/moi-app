import intro from "../../../../assets/sounds/intro.mp3";
import content from "../../../../assets/sounds/read_content.mp3";
import fondo from "../../../../assets/sounds/fondo.mp3";
import test from "../../../../assets/sounds/test.mp3";

export default sounds = {
    login: {
        source: intro,
        repeat: true
    },
    tree: {
        source: fondo,
        repeat: true
    },
    settings: {
        source: content,
        volume: 0.2
    },
    leaderboard: {
        source: content,
        volume: 0.2
    },
    searchFriends: {
        source: content,
        volume: 0.2
    },
    inventory: {
        source: content,
        volume: 0.2
    },
    content: {
        source: content,
        volume: 0.2
    },
    singleContent: {
        source: content,
        volume: 0.2
    },
    tasks: {
        source: content,
        volume: 0.2
    },
    search: {
        source: content,
        volume: 0.2
    },
    profile: {
        source: content,
        volume: 0.2
    },
    editProfile: {
        source: content,
        volume: 0.2
    },
    publicProfile: {
        source: content,
        volume: 0.2
    },
    quiz: {
        source: test,
    },
    randomContents: {
        source: content
    }
}