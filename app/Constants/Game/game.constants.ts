import { Game } from "@/app/Types/game.types";

export const defaultGameData: Game = {
    studenID: "",
    age: "",
    score: 0,
    gamedetail: {
        game1: [{
            name: "",
            pproposition: "",
            answer: "",
            Right_wrong: false
        }],
        game2: [{
            name: "",
            pproposition: "",
            answer: "",
            Right_wrong: false
        }],
        game3: [{
            name: "",
            VDO: "",
            answer: "",
            Right_wrong: false
        }],
        game4: [{
            name: "",
            pproposition: "",
            answer: "",
            Right_wrong: false
        }]
    }
}