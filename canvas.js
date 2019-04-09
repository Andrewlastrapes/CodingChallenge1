

// Should run canvas function for each arg given 



createEmptyCanvas = (w, h, y) => {
    let emptyRow = [];
    let emptyCanvas = [];
    let widthMakerRow = [];

    for (let i = 0; i < w; i++) {
        widthMakerRow.push("-")
    }

    for (let i = 0; i < w; i++) {
        emptyRow.push(' ')
    }

    widthMakerRow = widthMakerRow.join("")
    emptyRow = emptyRow.join("")

    for (let i = 0; i <= h + 1; i++) {
        if (i === 0 || i === h + 1) {
            emptyCanvas.push("|" + widthMakerRow + "|")
        } else if (i === h) {
            if(y === i){
                emptyCanvas.push("|" + widthMakerRow + "|")
                emptyCanvas.push("|" + widthMakerRow + "|")
            }
        } else {
            emptyCanvas.push("|" + emptyRow + "|")
        }
    }

    return emptyCanvas;
}

module.exports.canvasFun = (w, h, type, x, y, x2, y2, color) => {


    let emptyCanvas = createEmptyCanvas(w, h, y)
   
    if (type === "horizontal") {
        for (let i = 0; i < emptyCanvas.length; i++) {
            emptyCanvas[y] = "|" + makeLine(x - 1, x2, w, type).join("") + "|"
        }
    }
    if (type === "verticle") {
        for (let i = 0; i < emptyCanvas.length; i++) {
            if (i >= y && i <= y2) {
                emptyCanvas[i] = "|" + makeLine(x - 1, "", w, type, x2).join("") + "|"
            }
        }
    }

    if (type === "rectangle") {
        for (let i = 0; i < emptyCanvas.length; i++) {
            emptyCanvas[y] = "|" + makeLine(x - 1, x2, w, "horizontal", x2).join("") + "|"
            emptyCanvas[y2] = "|" + makeLine(x - 1, x2, w, "horizontal", x2).join("") + "|"

            if (i > y && i < y2) {
                emptyCanvas[i] = "|" + makeLine(x - 1, "", w, "rectangle", x2).join("") + "|"
            }
        }
    }

    if(type === "fill"){
        for(var i = 0; i < emptyCanvas.length; i++){
            if(i === 0){
                emptyCanvas[i] = "|" + makeLine(x, w, w, "fill", "", color).join("") + "|"
            }
            else if (i <= y && i !== 0){
                    emptyCanvas[i] = "|" + makeLine(0, w, w, "fill", "", color).join("") + "|"
                }
             }
        }

    return emptyCanvas

}


var makeLine = (
    starting,
    ending,
    totalRowLength,
    type,
    x2,
    color
) => {

    if (type === "horizontal") {
        var row = makeHorizontalLine(starting, ending, totalRowLength)
    } if (type === "verticle" || type === "rectangle") {
        var row = makeVerticleLine(starting, totalRowLength, type, x2)
    } if(type === "fill"){
        var row = makeHorizontalLine(starting, ending, totalRowLength, "fill", color)
    }
    return row;

}

var makeVerticleLine = (starting, totalRowLength, type, x2) => {
    let row = [];
    for (var i = 0; i < totalRowLength; i++) {
        if (i === starting) {
            row.push("x")
        } else if (type === "rectangle" && i === x2 - 1) {
            row.push("x")
        }
        else {
            row.push(" ")
        }
    }
    return row
}

var makeHorizontalLine = (
    starting,
    ending,
    totalRowLength,
    type, 
    color) => {
    let row = [];

    if(type !== "fill"){
        for (var i = 0; i < totalRowLength; i++) {
            if (i >= starting && i <= ending - 1) {
                row.push("x")
            } else {
                row.push(" ")
            }
        }
    }
    if(type === "fill"){
        for (var i = 0; i < totalRowLength; i++) {
            if (i >= starting && i <= ending - 1) {
                row.push(color)
            } else {
                row.push(" ")
            }
        }
    }

   
    return row
}






