function convert(s, numRows) {
    if (numRows === 1 || s.length <= numRows) {
        return s;
    }

    let rows = Array.from({ length: numRows }, () => "");
    let currentRow = 0;
    let goingDown = false;

    for (let char of s) {
        rows[currentRow] += char;

        if (currentRow === 0 || currentRow === numRows - 1) {
            goingDown = !goingDown;
        }

        currentRow += goingDown ? 1 : -1;
    }

    return rows.join("");
}

console.log(convert("PAYPALISHIRING", 3));