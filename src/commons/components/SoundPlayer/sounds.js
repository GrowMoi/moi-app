import intro from "../../../../assets/sounds/intro.mp3";
import content from "../../../../assets/sounds/read_content.mp3";
import fondo from "../../../../assets/sounds/fondo.mp3";
import test from "../../../../assets/sounds/test.mp3";
import profile from "../../../../assets/sounds/btn_profile.mp3";
import next from "../../../../assets/sounds/btn_next.mp3";
import learn_content from "../../../../assets/sounds/btn_learn_content.mp3";
import select_option from "../../../../assets/sounds/btn_select_option.mp3";
import recompensa from "../../../../assets/sounds/recompensa.mp3";
import inventory from "../../../../assets/sounds/btn_inventory.mp3";
import settings from "../../../../assets/sounds/btn_settings.mp3";
import friends from "../../../../assets/sounds/btn_amigos.mp3";
import search from "../../../../assets/sounds/btn_search.mp3";
import recomendation from "../../../../assets/sounds/btn_recomendation.mp3";
import show_tasks from "../../../../assets/sounds/btn_show_tasks.mp3";
import tree_actions from "../../../../assets/sounds/tree_actions.mp3";

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
    },

  buttons: {
    profile: profile,
    next: next,
    learnContent: learn_content,
    selectOption: select_option,
    inventory: inventory,
    settings: settings,
    leaderboard: friends,
    friends: friends,
    tasks: show_tasks,
    search: search,
    random: recomendation,
  },
  actions: {
    recompensa: recompensa,
    treeActions: tree_actions,
  }
}