import intro from "../../../../assets/sounds/intro.mp3";
import content from "../../../../assets/sounds/read_content.mp3";
import fondo from "../../../../assets/sounds/fondo.mp3";
import test from "../../../../assets/sounds/test.mp3";

export default sounds = {
    login: {
      payload: {
        source: intro,
        repeat: true,
      },
      soundName: 'intro',
    },
    register: {
      payload: {
        source: intro,
        repeat: true,
      },
      soundName: 'intro',
    },
    tree: {
      payload: {
        source: fondo,
        repeat: true,
      },
      soundName: 'fondo',
    },
    settings: {
      payload: {
        source: content,
        volume: 0.2,
      },
      soundName: 'content',
    },
    leaderboard: {
      payload: {
        source: content,
        volume: 0.2,
      },
      soundName: 'content',
    },
    searchFriends: {
      payload: {
        source: content,
        volume: 0.2,
      },
      soundName: 'content',
    },
    inventory: {
      payload: {
        source: content,
        volume: 0.2,
      },
      soundName: 'content',
    },
    content: {
      payload: {
        source: content,
        volume: 0.2,
      },
      soundName: 'content',
    },
    singleContent: {
      payload: {
        source: content,
        volume: 0.2,
      },
      soundName: 'content',
    },
    tasks: {
      payload: {
        source: content,
        volume: 0.2,
      },
      soundName: 'content',
    },
    search: {
      payload: {
        source: content,
        volume: 0.2,
      },
      soundName: 'content',
    },
    profile: {
      payload: {
        source: content,
        volume: 0.2,
      },
      soundName: 'content',
    },
    editProfile: {
      payload: {
        source: content,
        volume: 0.2,
      },
      soundName: 'content',
    },
    publicProfile: {
      payload: {
        source: content,
        volume: 0.2,
      },
      soundName: 'content',
    },
    quiz: {
      payload: {
        source: test,
      },
      soundName: 'test',
    },
    tutorQuiz: {
      payload: {
        source: test,
      },
      soundName: 'test',
    },
    randomContents: {
      payload: {
        source: content,
      },
      soundName: 'content',
    },

    // The bg audio play in these scenes
    playIn: {
      content: [
        'settings',
        'leaderboard',
        'searchFriends',
        'inventory',
        'content',
        'singleContent',
        'tasks',
        'search',
        'profile',
        'editProfile',
        'publicProfile',
        'randomContents',
      ],
      test: ['quiz', 'tutorQuiz'],
      fondo: ['tree'],
      intro: ['login', 'register']
    }
}
