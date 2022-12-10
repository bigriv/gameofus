export const CHARACTER_VISUAL = {
  DEFAULT: {
    head: {
      height: "3",
      width: "2.5",
      color: "lemonchiffon",
      other: {
        "border-bottom-right-radius": "30%",
        "border-bottom-left-radius": "30%",
      },
    },
    face: "normal",
    hair: "male_active",
    upper_body: {
      height: "5",
      width: "3",
      color: "white",
    },
    arm: {
      height: "5",
      width: "0.75",
      color: "lemonchiffon",
    },
    lower_body: {
      height: "2",
      width: "3",
      color: "silver",
    },
    leg: {
      height: "4",
      width: "1",
      color: "lemonchiffon",
    },
    options: [],
  },
  SHOPPER: {
    head: {
      height: "2.8",
      width: "4",
      color: "lemonchiffon",
      other: {
        "border-bottom-right-radius": "100%",
        "border-bottom-left-radius": "100%",
      },
    },
    face: "dandy",
    hair: "male_square",
    upper_body: {
      height: "5",
      width: "5.5",
      color: "black",
      other: {
        "border-bottom-right-radius": "15%",
        "border-bottom-left-radius": "15%",
      },
    },
    arm: {
      height: "3",
      width: "1",
      color: "black",
      other: {
        "border-top-left-radius": "90%",
      },
    },
    hand: {
      height: "1",
      width: "1",
      color: "lemonchiffon",
      other: {
        "border-radius": "30%",
      },
    },
    lower_body: {
      height: "2",
      width: "4.4",
      color: "black",
    },
    leg: {
      height: "1.5",
      width: "2",
      color: "black",
    },
    foot: {
      height: "0.25",
      width: "2",
      color: "white",
    },
  },
  YANKEE: {
    head: {
      height: "2.7",
      width: "2.5",
      color: "lemonchiffon",
      other: {
        "border-bottom-right-radius": "100%",
        "border-bottom-left-radius": "100%",
      },
    },
    face: "brave",
    hair: "male_regent",
    upper_body: {
      height: "5",
      width: "2",
      color: "black",
      other: {
        "border-top": "12rem solid black",
        "z-index": 2,
      },
    },
    arm: {
      height: "5",
      width: "1.7",
      color: "black",
    },
    hand: {
      height: "1",
      width: "1",
      color: "lemonchiffon",
    },
    lower_body: {
      height: "4.5",
      width: "3.5",
      color: "black",
      other: {
        "border-right": "16rem solid black",
        "box-sizing": "content-box",
        "border-left": "16rem solid black",
        "border-bottom": "20rem solid gray",
      },
    },
    leg: {
      height: "2",
      width: "1.5",
      color: "black",
    },
    foot: {
      height: "0.25",
      width: "1",
      color: "white",
    },
  },
  MONSTER: {
    head: {
      height: "3",
      width: "3",
      color: "red",
      other: {
        "border-radius": "25%",
      },
    },
    hair: "monster_horn",
    face: "ogre",
    upper_body: {
      height: "5",
      width: "4",
      color: "red",
      other: {
        "z-index": 2,
      },
    },
    arm: {
      height: "4",
      width: "1",
      color: "red",
    },
    hand: {
      height: "1",
      width: "1",
      color: "darkred",
    },
    lower_body: {
      height: "2.5",
      width: "4",
      color: "yellow",
    },
    leg: {
      height: "3.5",
      width: "1.5",
      color: "red",
    },
    foot: {
      height: "0.25",
      width: "1",
      color: "red",
    },
  },
  BOSS: {
    head: {
      height: "3",
      width: "3",
      color: "lightgray",
      other: {
        "border-radius": "40%",
      },
    },
    hair: "piero_hat",
    face: "piero",
    upper_body: {
      height: "4",
      width: "4",
      color: "yellow",
      other: {
        "z-index": 2,
      },
    },
    arm: {
      height: "4",
      width: "1",
      color: "lightgray",
    },
    hand: {
      height: "1",
      width: "1",
      color: "lightgray",
    },
    lower_body: {
      height: "3.5",
      width: "4",
      color: "yellow",
    },
    leg: {
      height: "3.5",
      width: "1.5",
      color: "red",
    },
    foot: {
      height: "0.25",
      width: "1",
      color: "lightgray",
    },
  },
};

export const CHARACTER_STATUS = {
  DEFAULT: {
    power: 0,
    life: 100,
  },
  YANKEE: {
    power: 10,
    life: 100,
  },
  MONSTER: {
    power: 20,
    life: 200,
  },
  BOSS: {
    power: 30,
    life: 300,
  },
};
