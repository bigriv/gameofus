import { IMAGE_ROOT_PATH } from "/src/composables/utils/const";
import { CHARACTER_VISUAL } from "/src/composables/tobehero/character";

export const constructHeroVisual = (character, items) => {
  character.mask = items.find((item) => item.id == "mask");
  if (character.mask) {
    character.visual.hair = {};
    character.visual.face = {};
    character.visual.head = {
      ...CHARACTER_VISUAL.DEFAULT.head,
      color: "transparent",
    };
  }
  character.mant = items.find((item) => item.id == "mant");
  if (character.mant) {
    character.visual.options.push({
      position: "absolute",
      "z-index": -1,
      width: "calc((var(--upper_body-width) + 4) * var(--unit))",
      height:
        "calc((var(--upper_body-height) + var(--lower_body-height) + 1) * var(--unit))",
      top: "calc(var(--head-height) * var(--unit))",
      left: "50%",
      transform: "translateX(-50%)",
      "background-image": `url(${IMAGE_ROOT_PATH + character.mant.img})`,
      "background-repeat": "no-repeat",
      "background-size": "100% 100%",
    });
  }

  character.suit_upper = items.find((item) => item.id == "suit_upper");
  if (character.suit_upper) {
    character.visual.arm.color = "red";
  }

  character.suit_lower = items.find((item) => item.id == "suit_lower");
  if (character.suit_lower) {
    character.visual.leg.color = "red";
  }
};
