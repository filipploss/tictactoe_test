// action creator
export const inc = () => {
    return { type: "INC" }
}

export const dec = () => {
    return { type: "DEC" }
}

export const rnd = (payload) => {
    return { type: "DEC", payload }
}