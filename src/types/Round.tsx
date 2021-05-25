import { Match } from "./Match";

export type Round = {
    id?: number
    no: number,
    isFinished?: boolean,
    matches?: Match[]
}