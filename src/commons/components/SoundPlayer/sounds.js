export default sounds = {
    login: {
      payload: {
        source: 'intro',
        repeat: true,
      },
      soundName: 'intro',
    },
    register: {
      payload: {
        source: 'intro',
        repeat: true,
      },
      soundName: 'intro',
    },
    tree: {
      payload: {
        source: 'fondo',
        repeat: true,
      },
      soundName: 'fondo',
    },
    settings: {
      payload: {
        source: 'read_content',
        volume: 0.2,
      },
      soundName: 'content',
    },
    leaderboard: {
      payload: {
        source: 'read_content',
        volume: 0.2,
      },
      soundName: 'content',
    },
    searchFriends: {
      payload: {
        source: 'read_content',
        volume: 0.2,
      },
      soundName: 'content',
    },
    inventory: {
      payload: {
        source: 'read_content',
        volume: 0.2,
      },
      soundName: 'content',
    },
    content: {
      payload: {
        source: 'read_content',
        volume: 0.2,
      },
      soundName: 'content',
    },
    singleContent: {
      payload: {
        source: 'read_content',
        volume: 0.2,
      },
      soundName: 'content',
    },
    tasks: {
      payload: {
        source: 'read_content',
        volume: 0.2,
      },
      soundName: 'content',
    },
    search: {
      payload: {
        source: 'read_content',
        volume: 0.2,
      },
      soundName: 'content',
    },
    profile: {
      payload: {
        source: 'read_content',
        volume: 0.2,
      },
      soundName: 'content',
    },
    editProfile: {
      payload: {
        source: 'read_content',
        volume: 0.2,
      },
      soundName: 'content',
    },
    publicProfile: {
      payload: {
        source: 'read_content',
        volume: 0.2,
      },
      soundName: 'content',
    },
    quiz: {
      payload: {
        source: 'test',
      },
      soundName: 'test',
    },
    tutorQuiz: {
      payload: {
        source: 'test',
      },
      soundName: 'test',
    },
    randomContents: {
      payload: {
        source: 'read_content',
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
  actions: {
    recompensa: 'recompensa',
    treeActions: 'tree_actions',
     profile: 'btn_profile',
    next: 'btn_next',
    learnContent: 'btn_learn_content',
    selectOption: 'btn_select_option',
    inventory: 'btn_inventory',
    settings: 'btn_settings',
    leaderboard: 'btn_amigos',
    friends: 'btn_amigos',
    tasks: 'btn_show_tasks',
    search: 'btn_search',
    random: 'btn_recomendation',
  }
}